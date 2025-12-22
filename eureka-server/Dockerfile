
FROM maven:3.9.11-eclipse-temurin-21 AS build

WORKDIR /app

# copy pom trước để cache dependency
COPY pom.xml .
RUN mvn dependency:go-offline -B

# copy source code
COPY src ./src

RUN mvn clean package -DskipTests

# Run
FROM eclipse-temurin:21-jdk AS run

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "app.jar"]

