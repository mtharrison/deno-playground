FRONTEND_VERSION=v1.0.6
SANDBOX_VERSION=v1.0.0

test:
	cd frontend/api && go test
build:
	cd frontend/api && GOOS=linux go build -o ../out/app
dev:
	cd frontend/ui && npm run dev &
	cd frontend/api && DENO_VERSIONS="v0.27.0,v0.26.0,v0.25.0" UI_ROOT=../ui/static go run main.go types.go sandbox.go

sandbox:
	cd sandbox && bash build-and-push.sh

frontend:
	make build-frontend && make push-frontend
build-frontend:
	docker build --no-cache -t mtharrison/deno-playground-frontend:$(FRONTEND_VERSION) frontend
push-frontend:
	docker push mtharrison/deno-playground-frontend:$(FRONTEND_VERSION)

.PHONY: sandbox frontend
