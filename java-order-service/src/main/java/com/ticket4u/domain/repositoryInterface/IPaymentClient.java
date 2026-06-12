package com.ticket4u.domain.repositoryInterface;

import com.ticket4u.infrastructure.api.dto.PaymentResponseData;

public interface IPaymentClient {

    PaymentResponseData getPaymentURL(String orderId, String amount); 
    
}
