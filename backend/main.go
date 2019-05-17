package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

func main() {
	concurrency, err := strconv.Atoi(os.Getenv("C"))
	if err != nil {
		concurrency = 10
	}

	fmt.Println("Concurrency level", concurrency)

	server := Server{
		queue: make(chan Job),
		limit: make(chan bool, concurrency),
	}

	go server.processQueue()

	server.addRoutes()
	server.listen()
}

func (server *Server) executeHandler(w http.ResponseWriter, r *http.Request) {

	f, flusher := w.(http.Flusher)

	stdout := make(chan []byte)
	stderr := make(chan []byte)

	server.queue <- Job{
		req:    r,
		stdout: stdout,
		stderr: stderr,
	}

	w.Header().Set("transfer-encoding", "chunked")
	w.Header().Set("content-type", "text/plain")

	var chunk []byte
	var closed bool

	stdoutStart := true

	for {
		select {
		case d, ok := <-stdout:
			if ok {
				if stdoutStart {
					w.Write([]byte("\n"))
					stdoutStart = false
					if flusher {
						f.Flush()
					}
				}
				chunk = d
			} else {
				closed = true
			}
		case d, ok := <-stderr:
			if ok {
				chunk = d
			} else {
				closed = true
			}
		}

		if closed {
			break
		}

		w.Write(chunk)
		if flusher {
			f.Flush()
		}
	}
}

func (server *Server) addRoutes() {
	http.Handle("/", http.FileServer(http.Dir("frontend/static")))
	http.HandleFunc("/execute", server.executeHandler)
}

func (server *Server) listen() {
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		port = 8090
	}
	fmt.Println("Server starting on port 8090...")
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}

func (server *Server) processQueue() {
	for job := range server.queue {
		server.limit <- true // get a slot
		go func(job Job) {
			sandbox(job)
			<-server.limit // free slot
		}(job)
	}
}
