package com.ticket4u.infrastructure.api.dto;

import lombok.Data;

@Data
public class PaymentData {
    private double amount;
    private String message;
    private String orderId;
    private String partnerCode;
    private String payUrl;
    private String requestId;
    private double responseTime;
    private double resultCode;
    private String shortLink;
}
