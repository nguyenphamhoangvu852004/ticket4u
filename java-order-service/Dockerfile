# # Build
# FROM maven:3.9.11-eclipse-temurin-21 AS build

# WORKDIR /app

# # copy pom trước để cache dependency
# COPY pom.xml .
# RUN mvn dependency:go-offline -B

# # copy source code
# COPY src ./src

# RUN mvn clean package -DskipTests

# # Run
# FROM eclipse-temurin:21-jdk AS run

# WORKDIR /app

# COPY --from=build /app/target/*.jar app.jar

# EXPOSE 8086

# ENTRYPOINT ["java", "-jar", "app.jar"]

# --- Stage 1: Build (Giữ nguyên) ---
FROM maven:3.9.11-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Cache dependency
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Build source
COPY src ./src
RUN mvn clean package -DskipTests

# --- Stage 2: Run (Đã bỏ tạo user/phân quyền) ---
FROM eclipse-temurin:21-jre-alpine AS run

WORKDIR /app

# Copy file jar bình thường (không cần chown gì cả)
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8086

# Chạy với quyền root mặc định
ENTRYPOINT ["java", "-jar", "app.jar"]