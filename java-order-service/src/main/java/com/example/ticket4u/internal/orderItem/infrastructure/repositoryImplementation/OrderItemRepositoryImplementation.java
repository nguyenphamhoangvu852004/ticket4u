package com.example.ticket4u.internal.orderItem.infrastructure.repositoryImplementation;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.ticket4u.internal.orderItem.domain.entity.OrderItem;
import com.example.ticket4u.internal.orderItem.domain.repositoryInterface.OrderItemRepositoryInterface;
import com.example.ticket4u.internal.orderItem.infrastructure.jpa.OrderItemJPARepository;
import com.example.ticket4u.internal.orderItem.infrastructure.jpa.model.OrderItemModelSchema;

import jakarta.transaction.Transactional;


@Repository
public class OrderItemRepositoryImplementation implements OrderItemRepositoryInterface {

    private final  OrderItemJPARepository  orderItemJPARepository;

    public OrderItemRepositoryImplementation(OrderItemJPARepository orderItemJPARepository) {
        this.orderItemJPARepository = orderItemJPARepository;
    }


    @Transactional
    @Override
    public OrderItem CreateOrderItem(OrderItem orderItem) {
        return this.orderItemJPARepository.save(new OrderItemModelSchema().builder()
        .id(orderItem.getUuid())
        .ticketId(orderItem.getTicketUuid())
        .orderId(orderItem.getOrderUuid())
        .quantity(orderItem.getQuantity())
        .createdAt(orderItem.getCreatedAt())
        .modifiedAt(orderItem.getModifiedAt())
        .deletedAt(orderItem.getDeletedAt())
        .creatorId(orderItem.getCreatorId())
        .modifierId(orderItem.getModifierId())
        .deletorId(orderItem.getDeletorId())
        .build()).toEntity();

    }


    @Transactional
    @Override
    public List<OrderItem> GetManyByOrderID(String orderID) {
        List<OrderItemModelSchema> list = this.orderItemJPARepository.getOrderItemsByOrderId(orderID);
            return list.stream().map(OrderItemModelSchema::toEntity).toList();
    }

   
    
}
