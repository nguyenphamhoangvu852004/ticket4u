package com.ticket4u.infrastructure.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.reactive.function.client.WebClient;

import com.ticket4u.domain.repositoryInterface.IPaymentClient;
import com.ticket4u.infrastructure.api.dto.PaymentResponseData;
import com.ticket4u.infrastructure.api.dto.requestDTO.PaymentRequestDTO;

@Repository
public class PaymentClientImpl implements IPaymentClient {

    private final WebClient webClient;

    public PaymentClientImpl(
            WebClient.Builder builder,
            @Value("${app.payment-url}") String baseUrl) {

        this.webClient = builder
                .baseUrl(baseUrl)
                .build();
    }

    @Override
    public PaymentResponseData getPaymentURL(String orderId, String amount) {
        PaymentRequestDTO reqData = new PaymentRequestDTO(orderId, amount);
        PaymentResponseData response = webClient.post()
                .uri("/payments")
                .bodyValue(reqData)
                .retrieve()
                .bodyToMono(PaymentResponseData.class).block();
        return response;
    }

}
