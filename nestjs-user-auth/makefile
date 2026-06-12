dev:
	powershell -ExecutionPolicy Bypass -Command "$$env:NODE_ENV='dev'; npm.cmd run start:dev"

docker-build-up:
	docker compose -f docker-compose.yml up -d --build

docker-up:
	docker compose -f docker-compose.yml up -d

docker-down:
	docker compose -f docker-compose.yml down -v