package com.example.ticket4u.internal.orderItem.domain.entity;

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
public class OrderItem extends BaseEntity {
    private String uuid;
    private String ticketUuid;
    private int quantity;
    private String orderUuid;
}
