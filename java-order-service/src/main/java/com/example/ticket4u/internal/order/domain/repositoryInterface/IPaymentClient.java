package com.example.ticket4u.internal.order.domain.repositoryInterface;

import com.example.ticket4u.internal.order.infrastructure.api.dto.PaymentResponseData;

public interface IPaymentClient {

    PaymentResponseData getPaymentURL(String orderId, String amount); 
    
}
