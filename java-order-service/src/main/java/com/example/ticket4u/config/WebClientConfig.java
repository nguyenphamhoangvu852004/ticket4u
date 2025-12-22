package com.example.ticket4u.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.ticket4u.internal.interceptor.LoggerInterceptor;


@Configuration
public class WebClientConfig   {


    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

}