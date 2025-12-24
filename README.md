# TICKET4U

Hệ thống **microservices đặt vé sự kiện**, được thiết kế theo kiến trúc phân tán, dễ mở rộng và triển khai bằng Docker.

---

## Tổng quan kiến trúc

Hệ thống gồm các service độc lập, giao tiếp thông qua API Gateway và Service Discovery.

### Các thành phần chính

- **API Gateway**
  - Spring Cloud Gateway
  - Định tuyến request

- **Eureka Server**
  - Spring Cloud Eureka
  - Service Discovery cho toàn hệ thống

- **Kafka**
  - Kafka (Hàng đợi tin nhắn)
  - Zookeeper (Quản lý Kafka Cluster)
  - Kafka UI (Giao diện cho Kafka)


- **Auth User Service**
  - NestJS
  - Quản lý người dùng, đăng ký / đăng nhập, JWT

- **Order Service**
  - Java Spring Boot
  - Xử lý đặt vé, đơn hàng, thanh toán (logic nghiệp vụ)

- **Event Ticket Service**
  - Go
  - Quản lý sự kiện

---

## Công nghệ sử dụng

- **Backend**
  - Java Spring Boot
  - Spring Cloud Gateway
  - Spring Cloud Eureka
  - NestJS
  - Go

- **Database**
  - MySQL
  - Redis

- **Hạ tầng**
  - Docker
  - Docker Compose

- **Tài liệu**
  - Swagger

---

## Cấu trúc thư mục

```bash
TICKET4U/
├── api-gateway/              # Spring Cloud Gateway
├── eureka-server/            # Service Discovery (Eureka)
├── kafka/                    # Kafka   
├── go-event-ticket-service/  # Event & Ticket Service (Go)
├── java-order-service/       # Order Service (Spring Boot)
└── nestjs-user-auth/         # User & Auth Service (NestJS)
