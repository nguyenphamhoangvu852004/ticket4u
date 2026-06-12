DOCKER_COMPOSE_FILE_CONVENTION = docker-compose.yml


SERVICE_PROJECT_NAME =\
  kafka\
 java-order-service \
 go-event-ticket-service\
  nestjs-user-auth\



docker-up:
	$(MAKE) -C kafka docker-up
	$(MAKE) -C java-order-service docker-up
	$(MAKE) -C go-event-ticket-service docker-up
	$(MAKE) -C nestjs-user-auth docker-up

docker-down:
	$(MAKE) -C kafka docker-down
	$(MAKE) -C java-order-service docker-down
	$(MAKE) -C go-event-ticket-service docker-down
	$(MAKE) -C nestjs-user-auth docker-down
	
docker-build-up:
	$(MAKE) -C kafka docker-build-up
	$(MAKE) -C nestjs-user-auth docker-build-up
	$(MAKE) -C java-order-service docker-build-up
	$(MAKE) -C go-event-ticket-service docker-build-up

# docker-down:
# 	@echo "Shutting down Core Services..."
# 	$(MAKE) -C go-event-ticket-service docker-down
# 	$(MAKE) -C java-order-service docker-down
# 	$(MAKE) -C nestjs-user-auth docker-down
# 	@echo "Shutting down Kafka..."
# 	$(MAKE) -C kafka docker-down

# auth:
# 	$(MAKE) -C nestjs-user-auth docker-up

# order:
# 	$(MAKE) -C java-order-service docker-up

# ticket:
# 	$(MAKE) -C go-event-ticket-service docker-up

# frontend-up:
# 	$(MAKE) -C frontend docker-up

# kafka:
# 	$(MAKE) -C kafka docker-up

