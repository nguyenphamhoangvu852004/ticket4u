package com.example.ticket4u.internal.order.domain.entity;

import java.util.List;

import com.example.ticket4u.internal.orderItem.domain.entity.OrderItem;
import com.example.ticket4u.pkg.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;


@SuperBuilder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderEntity extends BaseEntity {
    private String id;
    private OrderStatusEnum status;
    private String userId;
    private List<OrderItem> items;
}
