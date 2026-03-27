dev:
	powershell -ExecutionPolicy Bypass -Command "$$env:NODE_ENV='dev'; npm.cmd run start:dev"
docker-up:
	docker compose -f DockerCompose.yaml up -d --build

docker-down:	
	docker-compose DockerCompose.yaml down