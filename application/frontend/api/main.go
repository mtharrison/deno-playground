package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
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

	version := r.FormValue("version")

	f, flusher := w.(http.Flusher)

	stdout := make(chan []byte)

	server.queue <- Job{
		req:     r,
		stdout:  stdout,
		version: version,
	}

	hostname, err := os.Hostname()

	if err != nil {
		log.Printf("Error getting hostname: %s", err)
	}

	w.Header().Set("transfer-encoding", "chunked")
	w.Header().Set("content-type", "text/plain")
	w.Header().Set("x-pod-hostname", hostname)

	for {
		chunk, ok := <-stdout

		if !ok {
			break
		}

		w.Write(chunk)
		if flusher {
			f.Flush()
		}
	}
}

func (server *Server) versions(w http.ResponseWriter, r *http.Request) {
	versionString := os.Getenv("DENO_VERSIONS")
	versions := strings.Split(versionString, ",")

	data, err := json.Marshal(versions)

	if err != nil {
		log.Printf("Error marshalling: %s", err)
	}

	w.Header().Set("content-type", "application/json")

	w.Write(data)
}

func (server *Server) addRoutes() {
	uiRoot := os.Getenv("UI_ROOT")
	if uiRoot == "" {
		uiRoot = "../ui/static"
	}

	http.Handle("/", http.FileServer(http.Dir(uiRoot)))
	http.HandleFunc("/execute", server.executeHandler)
	http.HandleFunc("/versions", server.versions)
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
