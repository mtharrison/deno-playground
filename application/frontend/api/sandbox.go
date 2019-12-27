package main

import (
	"context"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"os"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/docker/client"
)

func sandbox(job Job) {

	tmpDir := os.Getenv("DENO_TMPDIR")

	if tmpDir == "" {
		tmpDir = "/tmp"
	}

	file, err := ioutil.TempFile(tmpDir, "*.ts")

	if err != nil {
		log.Printf("Error occured creating temp file: %s", err)
		job.stdout <- nil
		return
	}

	err = os.Chmod(file.Name(), 0777)
	if err != nil {
		log.Printf("Error occured changing file permissions: %s", err)
		job.stdout <- nil
		return
	}

	payload := ExecutePayload{}
	d := json.NewDecoder(job.req.Body)
	d.Decode(&payload)

	_, err = io.WriteString(file, payload.Code)
	if err != nil {
		log.Printf("Error occured writing temp file: %s", err)
		job.stdout <- nil
		return
	}

	ctx, cancel := context.WithTimeout(job.req.Context(), 10*time.Second)
	defer cancel()

	client, err := client.NewEnvClient()
	if err != nil {
		log.Printf("Error occured creating docker client: %s", err)
	}

	image := "docker.io/mtharrison/deno-playground-sandbox" + ":" + job.version

	reader, err := client.ImagePull(ctx, image, types.ImagePullOptions{})
	if err != nil {
		log.Printf("Error pulling image: %s", err)
	}

	io.Copy(os.Stdout, reader)

	cmd := []string{"./deno", "run"}

	if payload.Permissions.Net {
		cmd = append(cmd, "--allow-net")
	}

	if payload.Permissions.Read {
		cmd = append(cmd, "--allow-read")
	}

	if payload.Permissions.Write {
		cmd = append(cmd, "--allow-write")
	}

	if payload.Permissions.Run {
		cmd = append(cmd, "--allow-run")
	}

	if payload.Permissions.Env {
		cmd = append(cmd, "--allow-env")
	}

	cmd = append(cmd, "source.ts")

	resp, err := client.ContainerCreate(
		ctx,
		&container.Config{
			Image: image,
			Cmd:   cmd,
			Tty:   true,
		},
		&container.HostConfig{
			Binds:      []string{},
			AutoRemove: true,
			CapAdd: []string{
				"DAC_OVERRIDE",
			},
			CapDrop: []string{
				"ALL",
			},
			NetworkMode: "none",
			Resources: container.Resources{
				Memory:    256 * 1024 * 1024,
				PidsLimit: 512,
			},
			Mounts: []mount.Mount{
				mount.Mount{
					Type:   mount.TypeBind,
					Source: file.Name(),
					Target: "/home/deno/source.ts",
				},
			},
		}, nil, "",
	)
	if err != nil {
		log.Printf("Error creating container: %s", err)
	}

	err = client.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{})
	if err != nil {
		log.Printf("Error starting container: %s", err)
	}

	log.Printf("Container ID: %s", resp.ID)

	out, err := client.ContainerLogs(ctx, resp.ID, types.ContainerLogsOptions{
		ShowStdout: true,
		ShowStderr: true,
		Follow:     true,
	})
	if err != nil {
		log.Printf("Error getting logs: %s", err)
		return
	}

	writer := &LimitChannelWriter{channel: job.stdout, limit: 1e6}

	io.Copy(writer, out)
	close(job.stdout)
}
