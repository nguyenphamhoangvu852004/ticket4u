.PHONY: docker-up docker-down kafka auth order ticket frontend

docker-up:
	@echo "Starting Kafka..."
	$(MAKE) -C kafka docker-up
	@echo "Starting Core Services (Auth, Order, Ticket)..."
	$(MAKE) -C nestjs-user-auth docker-up
	$(MAKE) -C java-order-service docker-up
	$(MAKE) -C go-event-ticket-service docker-up

docker-down:
	@echo "Shutting down Core Services..."
	$(MAKE) -C go-event-ticket-service docker-down
	$(MAKE) -C java-order-service docker-down
	$(MAKE) -C nestjs-user-auth docker-down
	@echo "Shutting down Kafka..."
	$(MAKE) -C kafka docker-down

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

