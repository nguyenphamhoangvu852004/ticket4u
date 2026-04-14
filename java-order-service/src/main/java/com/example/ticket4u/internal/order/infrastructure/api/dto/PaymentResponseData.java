package com.example.ticket4u.internal.order.infrastructure.api.dto;

import lombok.Data;

@Data
public class PaymentResponseData {
    private int code;
    private String message;
    private PaymentData data;
}
