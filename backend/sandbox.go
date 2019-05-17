package main

import (
	"context"
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

	_, err = io.Copy(file, job.req.Body)
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
		// "--net=none",
		// "--memory=256m",
		"--pids-limit=512",
	}

	permissionsArgs := []string{
		"--allow-net",
		"--allow-read",
		"--allow-write",
		"--allow-run",
		"--allow-env",
	}

	args = append(args, securityArgs...)
	args = append(args, "mtharrison/deno", "./deno", "run")
	args = append(args, permissionsArgs...)
	args = append(args, "source.ts")

	cmd := exec.CommandContext(ctx, "docker", args...)

	cmd.Stdout = &ChannelWriter{channel: job.stdout}
	cmd.Stderr = &ChannelWriter{channel: job.stderr}

	cmd.Run()
	cmd.Wait()

	close(job.stdout)
	close(job.stderr)
}
