FRONTEND_VERSION=v1.0.5
SANDBOX_VERSION=v1.0.0

test:
	cd frontend/api && go test
build:
	cd frontend/api && GOOS=linux go build -o ../out/app
dev:
	cd frontend/ui && npm run dev &
	cd frontend/api && UI_ROOT=../ui/static go run main.go types.go sandbox.go

sandbox:
	make build-sandbox && make push-sandbox
build-sandbox:
	docker build -t mtharrison/deno-playground-sandbox:$(SANDBOX_VERSION) sandbox
push-sandbox:
	docker push mtharrison/deno-playground-sandbox:$(SANDBOX_VERSION)

frontend:
	make build-frontend && make push-frontend
build-frontend:
	docker build --no-cache -t mtharrison/deno-playground-frontend:$(FRONTEND_VERSION) frontend
push-frontend:
	docker push mtharrison/deno-playground-frontend:$(FRONTEND_VERSION)
