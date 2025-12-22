package com.example.ticket4u.internal.orderItem.infrastructure.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.ticket4u.internal.orderItem.infrastructure.jpa.model.OrderItemModelSchema;

public interface OrderItemJPARepository extends JpaRepository<OrderItemModelSchema,String> {
    @Query("SELECT o FROM order_details o WHERE o.orderId = :orderId")
    List<OrderItemModelSchema> getOrderItemsByOrderId(@Param("orderId") String orderId);
}
