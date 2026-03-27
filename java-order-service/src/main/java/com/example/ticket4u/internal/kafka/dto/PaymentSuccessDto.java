package com.example.ticket4u.internal.kafka.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PaymentSuccessDto {
    private String orderId;
    private String message;
    private int amount;
    private String status;
}
