# Stage 1: Build app
FROM golang:1.24-alpine AS builder
WORKDIR /app

# Copy go mod và tải dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy toàn bộ source code
COPY . .

# Build binary, output ra file tên app (tránh trùng tên thư mục)
RUN go build -o /go/bin/app ./cmd/server/main.go

# Stage 2: final image
FROM alpine:3.19
WORKDIR /
COPY --from=builder /go/bin/app /go-event-ticket-service
COPY ./config ./config
COPY ./sql ./sql

RUN chmod +x /go-event-ticket-service

EXPOSE 8085
ENTRYPOINT ["/go-event-ticket-service"]
