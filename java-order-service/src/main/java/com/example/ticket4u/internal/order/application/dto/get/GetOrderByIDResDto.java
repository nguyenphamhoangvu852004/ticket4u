package com.example.ticket4u.internal.order.application.dto.get;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GetOrderByIDResDto  {
    private String orderId;
    private String userId;
    private String status;
    private String totalPrice;
    private String createdAt;
    private String modifiedAt;
    private List<OrderItemResDto> orderItems;
}
