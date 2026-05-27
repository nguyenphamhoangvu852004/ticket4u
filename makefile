.PHONY: docker-up docker-down eureka gateway elk kafka auth order ticket frontend

docker-up:
	@echo "Starting Eureka..."
	$(MAKE) -C eureka-server docker-up
	@echo "Starting API Gateway..."
	$(MAKE) -C api-gateway docker-up
# 	@echo "Starting ELK Stack..."
# 	$(MAKE) -C ELK docker-up
	@echo "Starting Kafka..."
	$(MAKE) -C kafka docker-up
	@echo "Starting Core Services (Auth, Order, Ticket)..."
	$(MAKE) -C nestjs-user-auth docker-up
	$(MAKE) -C java-order-service docker-up
	$(MAKE) -C go-event-ticket-service docker-up
# 	@echo "Starting Frontend..."
# 	$(MAKE) -C frontend docker-up

docker-down:
	@echo "Shutting down Frontend..."
	$(MAKE) -C frontend docker-down
	@echo "Shutting down Core Services..."
	$(MAKE) -C go-event-ticket-service docker-down
	$(MAKE) -C java-order-service docker-down
	$(MAKE) -C nestjs-user-auth docker-down
	@echo "Shutting down Kafka..."
	$(MAKE) -C kafka docker-down
	@echo "Shutting down ELK Stack..."
	@docker compose -f ELK/DockerCompose.yml down
	@echo "Shutting down API Gateway..."
	@docker compose -f api-gateway/DockerCompose.yaml down
	@echo "Shutting down Eureka..."
	@docker compose -f eureka-server/DockerCompose.yaml down

eureka:
	$(MAKE) -C eureka-server docker-up

gateway:
	$(MAKE) -C api-gateway docker-up

elk:
	$(MAKE) -C ELK docker-up

auth:
	$(MAKE) -C nestjs-user-auth docker-up

order:
	$(MAKE) -C java-order-service docker-up

ticket:
	$(MAKE) -C go-event-ticket-service docker-up

frontend-up:
	$(MAKE) -C frontend docker-up

kafka:
	$(MAKE) -C kafka docker-up

