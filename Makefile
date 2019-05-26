ANSIBLE_PLAYBOOK=cd deployment && ansible-playbook -i hosts

test:
	cd backend && go test
build:
	cd backend && GOOS=linux go build -o ../out/app
	# cd frontend && npm run build
provision:
	$(ANSIBLE_PLAYBOOK) provision.yml
deploy:
	$(ANSIBLE_PLAYBOOK) deploy.yml
dev:
	cd frontend && npm run dev &
	cd backend && UI_ROOT=../frontend/static go run main.go types.go sandbox.go
build-sandbox:
	cd sandbox && docker build -t mtharrison/deno .
	docker run mtharrison/deno ./deno version | grep deno > frontend/static/version.txt
push-sandbox:
	cd sandbox && docker push mtharrison/deno
