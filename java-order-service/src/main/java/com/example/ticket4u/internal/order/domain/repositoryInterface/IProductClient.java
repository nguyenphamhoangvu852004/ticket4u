package com.example.ticket4u.internal.order.domain.repositoryInterface;

import java.io.IOException;

import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketResponseData;

public interface IProductClient {
    // boolean isExists(String productId) throws IOException;
    TicketResponseData getTicketById(String ticketId); 
}
