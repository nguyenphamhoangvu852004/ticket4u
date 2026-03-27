.PHONY: up down restart logs up-eureka up-gateway up-order up-auth up-event up-frontend

# Runs all microservices in the background
up:
	docker-compose -f eureka-server.yml up -d
	docker-compose -f java-order-service.yml up -d
	docker-compose -f nestjs-user-auth.yml up -d
	docker-compose -f go-event-ticket-service.yml up -d
	# Give Eureka and other backends a moment before bringing up the gateway and frontend
	docker-compose -f api-gateway.yml up -d
	docker-compose -f frontend.yml up -d

# Stops and removes all microservices containers
down:
	docker-compose -f frontend.yml down
	docker-compose -f api-gateway.yml down
	docker-compose -f go-event-ticket-service.yml down
	docker-compose -f nestjs-user-auth.yml down
	docker-compose -f java-order-service.yml down
	docker-compose -f eureka-server.yml down

# Restarts all microservices
restart: down up

# Individual Service Commands
up-eureka:
	docker-compose -f eureka-server.yml up -d

up-gateway:
	docker-compose -f api-gateway.yml up -d

up-order:
	docker-compose -f java-order-service.yml up -d

up-auth:
	docker-compose -f nestjs-user-auth.yml up -d

up-event:
	docker-compose -f go-event-ticket-service.yml up -d

up-frontend:
	docker-compose -f frontend.yml up -d

# Tails logs for all services combined
logs:
	docker-compose -f eureka-server.yml -f api-gateway.yml -f java-order-service.yml -f nestjs-user-auth.yml -f go-event-ticket-service.yml -f frontend.yml logs -f
