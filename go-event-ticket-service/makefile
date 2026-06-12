dev:
	powershell -Command "$$env:APP_ENV='local'; go run ./cmd/server/main.go"



docker-build-up:
	make swagger && docker compose -f docker-compose.yml up -d --build

docker-up:
	docker compose -f docker-compose.yml up -d

docker-down:
	docker compose -f docker-compose.yml down -v

swagger: 
	swag init -g ./cmd/server/main.go -o ./cmd/swag/docs
