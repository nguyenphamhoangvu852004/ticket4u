package com.ticket4u.infrastructure.repositoryImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ticket4u.domain.entity.OrderItemEntity;
import com.ticket4u.domain.repositoryInterface.IOrderItemRepository;
import com.ticket4u.infrastructure.jpa.OrderItemJPARepository;
import com.ticket4u.infrastructure.jpa.model.OrderItemModelSchema;

import jakarta.transaction.Transactional;

@Repository
public class OrderItemRepositoryImpl implements IOrderItemRepository {

    private final OrderItemJPARepository orderItemJPARepository;

    public OrderItemRepositoryImpl(OrderItemJPARepository orderItemJPARepository) {
        this.orderItemJPARepository = orderItemJPARepository;
    }

    @Transactional
    @Override
    public OrderItemEntity CreateOrderItem(OrderItemEntity orderItem) {
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

    @Override
    public List<OrderItemEntity> GetManyByOrderID(String orderID) {
        List<OrderItemModelSchema> list = this.orderItemJPARepository.getOrderItemsByOrderId(orderID);
        return list.stream().map(OrderItemModelSchema::toEntity).toList();
    }

    @Override
    public List<OrderItemEntity> CreateMultiOrderItem(List<OrderItemEntity> orderItem) {
        List<OrderItemModelSchema> listModelSchema = new ArrayList<>();
        for (OrderItemEntity item : orderItem) {
            listModelSchema.add(new OrderItemModelSchema().builder()
                    .id(item.getUuid())
                    .ticketId(item.getTicketUuid())
                    .orderId(item.getOrderUuid())
                    .quantity(item.getQuantity())
                    .createdAt(item.getCreatedAt())
                    .modifiedAt(item.getModifiedAt())
                    .deletedAt(item.getDeletedAt())
                    .creatorId(item.getCreatorId())
                    .modifierId(item.getModifierId())
                    .deletorId(item.getDeletorId())
                    .build());
        }

        List<OrderItemModelSchema> list = this.orderItemJPARepository.saveAll(listModelSchema);
        return list.stream().map(OrderItemModelSchema::toEntity).toList();
    }

    @Override
    @Transactional
    public void saveAll(List<OrderItemEntity> orderItems) {
        List<OrderItemModelSchema> listModelSchema = new ArrayList<>();
        for (OrderItemEntity item : orderItems) {
            System.err.println("🚀 ~ OrderItemRepositoryImplementation ~ saveAll ~ item: " + item);
            listModelSchema.add(new OrderItemModelSchema().builder()
                    .id(item.getUuid())
                    .ticketId(item.getTicketUuid())
                    .orderId(item.getOrderUuid())
                    .quantity(item.getQuantity())
                    .createdAt(item.getCreatedAt())
                    .modifiedAt(item.getModifiedAt())
                    .deletedAt(item.getDeletedAt())
                    .creatorId(item.getCreatorId())
                    .modifierId(item.getModifierId())
                    .deletorId(item.getDeletorId())
                    .build());
        }

        this.orderItemJPARepository.saveAll(listModelSchema);
    }

}
