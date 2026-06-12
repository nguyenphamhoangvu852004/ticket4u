package com.ticket4u.domain.repositoryInterface;

import java.io.IOException;
import java.util.List;

import com.ticket4u.domain.entity.OrderItemEntity;
import com.ticket4u.infrastructure.api.dto.TicketData;
import com.ticket4u.infrastructure.api.dto.TicketResponseData;

public interface IProductClient {
    // boolean isExists(String productId) throws IOException;
    TicketResponseData<TicketData> getTicketById(String ticketId);

    TicketResponseData<List<TicketData>> getTicketsByIds(List<String> ids);

    void reduceStock(String orderId,  List<OrderItemEntity> items);
}
