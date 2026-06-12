package com.ticket4u.infrastructure.api.dto;

import lombok.Data;

@Data
public class PaymentResponseData {
    private int code;
    private String message;
    private PaymentData data;
}
