package com.example.ticket4u.internal.orderItem.domain.repositoryInterface;

import java.util.List;


import com.example.ticket4u.internal.orderItem.domain.entity.OrderItem;


public interface OrderItemRepositoryInterface {
    OrderItem CreateOrderItem(OrderItem orderItem);
    List<OrderItem> GetManyByOrderID(String orderID);
}
