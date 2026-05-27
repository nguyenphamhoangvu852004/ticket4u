# 🎟️ TICKET4U

**Hệ thống microservices đặt vé sự kiện** hiện đại, được thiết kế theo kiến trúc phân tán, dễ mở rộng và triển khai bằng Docker.

**[📊 Performance Testing Report](https://docs.google.com/document/d/1CinwjW4ZRdG4ohZu966hsoZjUtjJJSFFvDfGCilQaSg/edit?tab=t.0)**

---

## 🌟 Giới thiệu

Ticket4U là dự án **microservices** mô phỏng nền tảng bán vé concert trực tuyến. Hệ thống được xây dựng với mục tiêu **high concurrency**, **scalability** và **fault tolerance**, áp dụng các công nghệ và best practices phổ biến trong ngành.

---

## 🏗️ Tổng quan kiến trúc

Hệ thống được thiết kế theo kiến trúc **Microservices** với:
- **API Gateway** làm điểm vào duy nhất
- **Service Discovery** (Eureka)
- **Event-Driven Architecture** sử dụng **Kafka**
- **Hybrid Deployment** (Local + Docker)

### Các Service chính

| Service                | Ngôn ngữ / Framework     | Trách nhiệm chính                     |
|------------------------|--------------------------|---------------------------------------|
| **API Gateway**        | Spring Cloud Gateway     | Routing, Authentication, Rate Limiting |
| **Eureka Server**      | Java Spring Boot         | Service Discovery                     |
| **User & Auth Service**| NestJS (TypeScript)      | Quản lý user, auth, JWT               |
| **Order Service**      | **Java Spring Boot**     | Xử lý đơn hàng, thanh toán            |
| **Event Ticket Service**| **Go (Gin)**            | Quản lý sự kiện, vé, inventory        |

---

## 🛠️ Công nghệ sử dụng

**Backend**
- Java Spring Boot
- NestJS (TypeScript)
- Go + Gin

**Database & Caching**
- MySQL
- Redis

**Messaging & Streaming**
- Apache Kafka

**Infrastructure**
- Docker & Docker Compose
- Eureka Service Discovery
- Swagger/OpenAPI

**Testing**
- Apache Bench (Performance)
- JUnit, Jest

---

## 📁 Cấu trúc thư mục

```bash
TICKET4U/
├── api-gateway/                  # Spring Cloud Gateway
├── eureka-server/                # Service Discovery
├── kafka/                        # Kafka + Zookeeper
├── java-order-service/           # Order Service (Spring Boot)
├── go-event-ticket-service/      # Event & Ticket Service (Go)
├── nestjs-user-auth/             # User & Auth Service (NestJS)
├── docker-compose.yml
├── README.md
└── performance-testing/          # Kết quả benchmark
