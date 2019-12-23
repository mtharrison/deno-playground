package main

import (
	"errors"
	"net/http"
)

// Server wraps the state for the application
type Server struct {
	queue chan Job
	limit chan bool
}

// Job represents an API request packaged with a response channel
type Job struct {
	req    *http.Request
	stdout chan []byte
}

// LimitChannelWriter implements io.Writer, writing all bytes to a chan []byte
type LimitChannelWriter struct {
	channel chan []byte
	limit   int
	written int
}

func (w *LimitChannelWriter) Write(d []byte) (int, error) {
	n := len(d)
	if w.written+n > w.limit {
		return 0, errors.New("Reached write limit")
	}
	w.channel <- d
	w.written += n
	return n, nil
}

type Permissions struct {
	Net   bool
	Read  bool
	Write bool
	Run   bool
	Env   bool
}

type ExecutePayload struct {
	Code        string
	Permissions Permissions
}
