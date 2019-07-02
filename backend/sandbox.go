package main

import (
	"context"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"time"
)

func sandbox(job Job) {

	file, err := ioutil.TempFile("/tmp", "*.ts")
	if err != nil {
		log.Printf("Error occured creating temp file: %s", err)
		job.stdout <- nil
		job.stderr <- nil
		return
	}

	err = os.Chmod(file.Name(), 0777)
	if err != nil {
		log.Printf("Error occured changing file permissions: %s", err)
		job.stdout <- nil
		job.stderr <- nil
		return
	}

	payload := ExecutePayload{}
	d := json.NewDecoder(job.req.Body)
	d.Decode(&payload)

	_, err = io.WriteString(file, payload.Code)
	if err != nil {
		log.Printf("Error occured writing temp file: %s", err)
		job.stdout <- nil
		job.stderr <- nil
		return
	}

	ctx, cancel := context.WithTimeout(job.req.Context(), 10*time.Second)
	defer cancel()

	args := []string{
		"run",
		"--rm",
		"-v",
		file.Name() + ":/home/deno/source.ts",
	}

	securityArgs := []string{
		"--cap-drop=ALL",
		"--cap-add=DAC_OVERRIDE",
		"--net=none",
		"--memory=256m",
		"--pids-limit=512",
	}

	permissionsArgs := []string{}

	if payload.Permissions.Net {
		permissionsArgs = append(permissionsArgs, "--allow-net")
	}

	if payload.Permissions.Read {
		permissionsArgs = append(permissionsArgs, "--allow-read")
	}

	if payload.Permissions.Write {
		permissionsArgs = append(permissionsArgs, "--allow-write")
	}

	if payload.Permissions.Run {
		permissionsArgs = append(permissionsArgs, "--allow-run")
	}

	if payload.Permissions.Env {
		permissionsArgs = append(permissionsArgs, "--allow-env")
	}

	args = append(args, securityArgs...)
	args = append(args, "mtharrison/deno", "./deno", "run")
	args = append(args, permissionsArgs...)
	args = append(args, "source.ts")

	cmd := exec.CommandContext(ctx, "docker", args...)

	cmd.Stdout = &LimitChannelWriter{channel: job.stdout, limit: 1e6}
	cmd.Stderr = &LimitChannelWriter{channel: job.stderr, limit: 1e6}

	err = cmd.Run()
	if err != nil {
		job.stderr <- []byte(err.Error())
	}

	close(job.stdout)
	close(job.stderr)
}
