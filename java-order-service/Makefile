
APP_NAME = java-order-service
APP_PORT = 8086

dev:
	mvn spring-boot:run

docker-up:
	docker-compose -f DockerCompose.yaml up -d --build && docker network connect microservice-net java-order-service 

docker-down:
	docker-compose -f DockerCompose.yaml down -v


