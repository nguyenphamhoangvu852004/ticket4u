dev:
	mvn spring-boot:run

docker-up:
	docker-compose -f DockerCompose.yaml up -d --build && docker network connect microservice-net api-gateway
