# 🎟️ TICKET4U

**A modern event ticket booking microservices system**, designed with a distributed architecture for scalability and containerized deployment using Docker.

**Performance Testing Report:**
https://docs.google.com/document/d/1CinwjW4ZRdG4ohZu966hsoZjUtjJJSFFvDfGCilQaSg/edit?tab=t.0

---

## 🌟 Introduction

Ticket4U is a **microservices-based** project that simulates an online concert ticketing platform. The system is built with a focus on **high concurrency**, **scalability**, and **fault tolerance**, while applying modern backend technologies and industry best practices.

The architecture leverages independent services communicating through REST APIs and asynchronous messaging using Kafka, enabling easier scaling and maintenance.

---

## 🏗️ Architecture Overview

The system follows a **Microservices Architecture** with:

* **Nginx Reverse Proxy** as the single entry point
* **Event-Driven Architecture** powered by Kafka
* **Containerized Deployment** using Docker

### Core Services

| Service                  | Language / Framework | Main Responsibility                     |
| ------------------------ | -------------------- | --------------------------------------- |
| **Nginx Gateway**        | Nginx                | Reverse proxy, request routing          |
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

* Docker
* Docker Compose
* Nginx
* Swagger/OpenAPI

### Testing

* Apache Bench (Performance Testing)
* JUnit
* Jest

---

## 📁 Project Structure

```bash
TICKET4U/
├── nginx/                        # Reverse proxy configuration
├── kafka/                        # Kafka + Zookeeper
├── java-order-service/           # Order Service (Spring Boot)
├── go-event-ticket-service/      # Event & Ticket Service (Go)
├── nestjs-user-auth/             # User & Auth Service (NestJS)
├── docker-compose.yml
└── README.md
```

---

## 🚀 Key Features

* Microservices architecture
* JWT-based authentication and authorization
* Kafka event-driven communication
* Redis caching support
* Dockerized deployment
* Independent service scalability
* API documentation with Swagger
* Performance and load testing support

---

## 🔄 Communication Flow

```text
Client
   ↓
Nginx Reverse Proxy
   ↓
+---------------------------+
| Microservices             |
|                           |
| User/Auth Service         |
| Order Service             |
| Event Ticket Service      |
+---------------------------+
            ↓
         Kafka
            ↓
    Asynchronous Events
```
