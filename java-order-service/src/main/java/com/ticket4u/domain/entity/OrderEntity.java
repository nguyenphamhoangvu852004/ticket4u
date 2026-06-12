package com.ticket4u.domain.entity;

import java.util.List;

import com.ticket4u.pkg.entity.BaseEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
public class OrderEntity extends BaseEntity {
    private String id;
    private OrderStatusEnum status;
    private String userId;
    private List<OrderItemEntity> items;
}
