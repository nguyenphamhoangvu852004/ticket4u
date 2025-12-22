package com.example.ticket4u.internal.order.application.dto.get;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResDto {
    private String id;
    private String totalPrice;
    private int quantity;
    private String createdAt;
    private String modifiedAt;
}
