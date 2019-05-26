package main

import (
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
	stderr chan []byte
}

// ChannelWriter implements io.Writer, writing all bytes to a chan []byte
type ChannelWriter struct {
	channel chan []byte
}

func (w *ChannelWriter) Write(d []byte) (int, error) {
	w.channel <- d
	return len(d), nil
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
