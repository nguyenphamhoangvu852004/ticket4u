package com.example.ticket4u.internal.order.infrastructure.jpa.model;

import org.hibernate.annotations.Type;

import com.example.ticket4u.internal.order.domain.entity.OrderEntity;
import com.example.ticket4u.internal.order.domain.entity.OrderStatusEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity(name = "orders")
public class OrderModelSchema {
    @Column(name = "id", unique = true, nullable = false, columnDefinition = "VARCHAR(36)")
    @Id
    private String id;

    @Column(name = "userId", unique = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private String userId;

    @Column(name = "status", unique = false, nullable = false, columnDefinition = "enum('PENDING','PAID','CANCELLED','SUCCESS')")
    private String status;

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

    public OrderEntity toEntity() {
        return new OrderEntity().builder()
                .id(id)
                .createdAt(createdAt)
                .modifiedAt(modifiedAt)
                .deletedAt(deletedAt)
                .creatorId(creatorId)
                .modifierId(modifierId)
                .deletorId(deletorId)
                .status(OrderStatusEnum.valueOf(status))
                .userId(userId)
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
