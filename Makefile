ANSIBLE_PLAYBOOK=cd deployment && ansible-playbook -i hosts

test:
	cd backend && go test
build:
	cd backend && GOOS=linux go build -o ../out/app
provision:
	$(ANSIBLE_PLAYBOOK) provision.yml
deploy:
	$(ANSIBLE_PLAYBOOK) deploy.yml
dev:
	cd frontend && npm run dev &
	cd backend && UI_ROOT=../frontend/static go run main.go types.go sandbox.go

