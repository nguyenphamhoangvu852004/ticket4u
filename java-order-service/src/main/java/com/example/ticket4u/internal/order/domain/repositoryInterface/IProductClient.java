package com.example.ticket4u.internal.order.domain.repositoryInterface;

import java.io.IOException;
import java.util.List;

import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketData;
import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketResponseData;
import com.example.ticket4u.internal.orderItem.domain.entity.OrderItem;

public interface IProductClient {
    // boolean isExists(String productId) throws IOException;
    TicketResponseData<TicketData> getTicketById(String ticketId);

    TicketResponseData<List<TicketData>> getTicketsByIds(List<String> ids);

    void reduceStock(String orderId,  List<OrderItem> items);
}
