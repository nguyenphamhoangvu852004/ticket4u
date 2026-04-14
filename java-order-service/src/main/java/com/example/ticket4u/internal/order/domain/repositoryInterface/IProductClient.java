package com.example.ticket4u.internal.order.domain.repositoryInterface;

import java.io.IOException;
import java.util.List;

import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketData;
import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketResponseData;

public interface IProductClient {
    // boolean isExists(String productId) throws IOException;
    TicketResponseData<TicketData> getTicketById(String ticketId);

    TicketResponseData<List<TicketData>> getTicketsByIds(List<String> ids);
}
