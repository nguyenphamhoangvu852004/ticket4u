package com.example.ticket4u.internal.order.domain.repositoryInterface;

import java.io.IOException;

import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketResDto;

public interface ProductClientInterface {
    // boolean isExists(String productId) throws IOException;
    TicketResDto getTicketById(String ticketId); 
}
