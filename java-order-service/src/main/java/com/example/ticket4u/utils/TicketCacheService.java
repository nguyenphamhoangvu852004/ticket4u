package com.example.ticket4u.utils;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketData;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TicketCacheService {

    private final RedisTemplate<String, TicketData> redisTemplate;

    private static final String PREFIX = "ticket:";

    public TicketData get(String ticketId) {

        Object value = redisTemplate.opsForValue()
                .get(PREFIX + ticketId);

        if (value == null) {
            return null;
        }

        return (TicketData) value;
    }

    public List<TicketData> getTicketsByIds(List<String> ids) {

        List<String> keys = ids.stream()
                .map(id -> PREFIX + id)
                .toList();

        List<TicketData> values = redisTemplate
                .opsForValue()
                .multiGet(keys);

        if (values == null || values.isEmpty()) {
            return Collections.emptyList();
        }

        return values.stream()
                .filter(Objects::nonNull)
                .map(value -> (TicketData) value)
                .toList();
    }

    public void set(TicketData ticket) {

        redisTemplate.opsForValue().set(
                PREFIX + ticket.getId(),
                ticket,
                Duration.ofMinutes(5));
    }

    public void saveTickets(List<TicketData> tickets) {

        Map<String, TicketData> cacheMap = new HashMap<>();

        for (TicketData ticket : tickets) {

            cacheMap.put(
                    PREFIX + ticket.getId(),
                    ticket);
        }

        redisTemplate.opsForValue()
                .multiSet(cacheMap);
    }
}