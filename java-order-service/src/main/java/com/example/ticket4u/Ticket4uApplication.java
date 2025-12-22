package com.example.ticket4u;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.kafka.annotation.EnableKafka;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
    info = @Info(
        title = "User Service API",
        version = "1.0.0",
        description = "API managements for Order Service",
        contact = @Contact(
            name = "Nguyễn Vũ",
            email = "nguyenvu@example.com"
        )
    )
)
@SpringBootApplication()
@EnableKafka
@EnableDiscoveryClient
public class Ticket4uApplication {

	public static void main(String[] args) {
		SpringApplication.run(Ticket4uApplication.class, args);
	}

}
