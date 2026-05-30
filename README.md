# 🎟️ TICKET4U

**A modern event ticket booking microservices system**, designed with a distributed architecture for scalability and containerized deployment using Docker.

**Performance Testing Report:** https://docs.google.com/document/d/1CinwjW4ZRdG4ohZu966hsoZjUtjJJSFFvDfGCilQaSg/edit?tab=t.0

---

## 🌟 Introduction

Ticket4U is a **microservices-based** project that simulates an online concert ticketing platform. The system is built with a focus on **high concurrency**, **scalability**, and **fault tolerance**, while applying widely adopted technologies and industry best practices.

---

## 🏗️ Architecture Overview

The system follows a **Microservices Architecture** with:

* **API Gateway** as the single entry point
* **Service Discovery** using Eureka
* **Event-Driven Architecture** powered by Kafka
* **Hybrid Deployment** (Local + Docker)

### Core Services

| Service                  | Language / Framework | Main Responsibility                     |
| ------------------------ | -------------------- | --------------------------------------- |
| **API Gateway**          | Spring Cloud Gateway | Routing, Authentication, Rate Limiting  |
| **Eureka Server**        | Java Spring Boot     | Service Discovery                       |
| **User & Auth Service**  | NestJS (TypeScript)  | User management, authentication, JWT    |
| **Order Service**        | Java Spring Boot     | Order processing and payment handling   |
| **Event Ticket Service** | Go (Gin)             | Event, ticket, and inventory management |

---

## 🛠️ Technology Stack

### Backend

* Java Spring Boot
* NestJS (TypeScript)
* Go + Gin

### Database & Caching

* MySQL
* Redis

### Messaging & Streaming

* Apache Kafka

### Infrastructure

* Docker & Docker Compose
* Eureka Service Discovery
* Swagger/OpenAPI

### Testing

* Apache Bench (Performance Testing)
* JUnit
* Jest

---

## 📁 Project Structure

```bash
TICKET4U/
├── api-gateway/                  # Spring Cloud Gateway
├── eureka-server/                # Service Discovery
├── kafka/                        # Kafka + Zookeeper
├── java-order-service/           # Order Service (Spring Boot)
├── go-event-ticket-service/      # Event & Ticket Service (Go)
├── nestjs-user-auth/             # User & Auth Service (NestJS)
├── docker-compose.yml
└── README.md
```
