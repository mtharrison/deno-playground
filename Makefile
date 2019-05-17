test:
	cd backend && go test
build:
	cd backend && GOOS=linux go build -o ../out/app
provision:
	cd deployment && ansible-playbook -i hosts provision.yml
deploy:
	cd deployment && ansible-playbook -i hosts deploy.yml
