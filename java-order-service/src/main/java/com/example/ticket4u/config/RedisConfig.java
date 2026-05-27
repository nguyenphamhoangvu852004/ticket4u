package com.example.ticket4u.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketData;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, TicketData> redisTemplate(
            RedisConnectionFactory connectionFactory
    ) {

        RedisTemplate<String, TicketData> template =
                new RedisTemplate<>();

        template.setConnectionFactory(connectionFactory);

        template.setKeySerializer(
                new StringRedisSerializer()
        );

        template.setValueSerializer(
                new GenericJackson2JsonRedisSerializer()
        );

        template.afterPropertiesSet();

        return template;
    }
}