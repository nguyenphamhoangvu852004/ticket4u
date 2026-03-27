package com.example.ticket4u.internal.order.infrastructure.api.dto.requestDTO;

import lombok.Data;

@Data
public class PaymentRequestDTO {
    private String orderId;
    private String amount;
    public PaymentRequestDTO(String orderId, String amount){
        this.orderId = orderId;
        this.amount = amount;
    }
}
