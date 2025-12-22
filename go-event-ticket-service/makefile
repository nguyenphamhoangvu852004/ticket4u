dev:
	go run ./cmd/server/


# docker-up:
# 	cd environment && docker-compose -f docker-compose-dev.yml up -d --build && docker network connect kafka_default go-event-ticket-service 
#



docker-up:
# 	docker-compose --file environment/docker-compose-container.yml up --detach --build && docker network connect microservice-net go-event-ticket-service
	docker-compose --file ./docker-compose.yml up --detach --build && docker network connect microservice-net go-event-ticket-service

docker-down:
	docker-compose --file environment/docker-compose-container.yml down --volumes

docker-start:
	docker-compose --file environment/docker-compose-container.yml start

docker-stop:
	docker-compose --file environment/docker-compose-container.yml stop


