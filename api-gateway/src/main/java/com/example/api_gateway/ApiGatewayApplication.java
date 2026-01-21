package com.example.api_gateway;

import java.util.Objects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.cache.CacheProperties.Redis;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;

import reactor.core.publisher.Mono;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {
	private final ReactiveStringRedisTemplate redisTemplate;

	public ApiGatewayApplication(ReactiveStringRedisTemplate redisTemplate) {
		this.redisTemplate = redisTemplate;

	}

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

	@Bean
	public KeyResolver ipKeyResolver() {
		return exchange -> {
			// Log ra để biết chắc chắn nó được gọi
			System.out.println(">>> RATE LIMITER ĐANG CHẶN IP: " +
					exchange.getRequest().getRemoteAddress().getAddress().getHostAddress());

			return Mono.just(exchange.getRequest().getRemoteAddress().getAddress().getHostAddress());
		};
	}
}
