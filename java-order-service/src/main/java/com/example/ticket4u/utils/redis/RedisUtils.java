package com.example.ticket4u.utils.redis;


import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtils {

    private final StringRedisTemplate redisTemplate;

    public void setRedis(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public String getRedisKey(String key) {
        return redisTemplate.opsForValue().get(key);
    }
}
