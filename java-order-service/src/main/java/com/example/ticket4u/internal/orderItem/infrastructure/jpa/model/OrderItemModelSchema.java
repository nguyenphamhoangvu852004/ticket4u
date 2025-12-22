package com.example.ticket4u.internal.orderItem.infrastructure.jpa.model;

import com.example.ticket4u.internal.order.domain.entity.OrderEntity;
import com.example.ticket4u.internal.order.infrastructure.jpa.model.OrderModelSchema;
import com.example.ticket4u.internal.orderItem.domain.entity.OrderItem;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "order_details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemModelSchema {

    @Id
    @Column(name = "id", unique = true, nullable = false, columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(name = "ticket_id", unique = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private String ticketId;

    @Column(name = "quantity", unique = false, nullable = false, columnDefinition = "tinyint")
    private int quantity;

    @Column(name = "order_id", unique = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private String orderId;

    @Column(name = "creator_id", unique = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private String creatorId;
    @Column(name = "modifier_id", unique = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private String modifierId;
    @Column(name = "deletor_id", unique = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private String deletorId;

    @Column(name = "created_at", nullable = false, columnDefinition = "BIGINT")
    private int createdAt;
    @Column(name = "modified_at", nullable = false, columnDefinition = "BIGINT")
    private int modifiedAt;
    @Column(name = "deleted_at", nullable = false, columnDefinition = "BIGINT")
    private int deletedAt;

    public OrderItem toEntity() {
    
        return OrderItem.builder()
                .uuid(id)
                .ticketUuid(ticketId)
                .quantity(quantity)
                .createdAt(createdAt)
                .modifiedAt(modifiedAt)
                .deletedAt(deletedAt)
                .creatorId(creatorId)
                .modifierId(modifierId)
                .deletorId(deletorId)
                .build();
    }

    public OrderModelSchema toModelSchema(OrderEntity orderEntity) {
        return new OrderModelSchema().builder()
                .id(orderEntity.getId())
                .userId(orderEntity.getUserId())
                .status(orderEntity.getStatus().toString())
                .creatorId(orderEntity.getCreatorId())
                .modifierId(orderEntity.getModifierId())
                .deletorId(orderEntity.getDeletorId())
                .createdAt(orderEntity.getCreatedAt())
                .modifiedAt(orderEntity.getModifiedAt())
                .deletedAt(orderEntity.getDeletedAt())
                .build();
    }
}
