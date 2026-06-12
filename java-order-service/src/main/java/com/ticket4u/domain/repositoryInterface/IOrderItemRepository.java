package com.ticket4u.domain.repositoryInterface;

import java.util.List;

import com.ticket4u.domain.entity.OrderItemEntity;

public interface IOrderItemRepository {
    OrderItemEntity CreateOrderItem(OrderItemEntity orderItem);

    List<OrderItemEntity> CreateMultiOrderItem(List<OrderItemEntity> orderItem);

    List<OrderItemEntity> GetManyByOrderID(String orderID);

    void saveAll(List<OrderItemEntity> orderItems);
}
