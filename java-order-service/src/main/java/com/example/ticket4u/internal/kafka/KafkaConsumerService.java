package com.example.ticket4u.internal.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;

import com.example.ticket4u.internal.kafka.dto.PaymentSuccessDto;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderResDTO;
import com.example.ticket4u.internal.order.application.service.IOrderService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class KafkaConsumerService {

    @Autowired
    private IOrderService orderService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "payment.success", groupId = "payment-group")
    public void consume(String message,Acknowledgment ack) {

        try {
            PaymentSuccessDto dto = objectMapper.readValue(message, PaymentSuccessDto.class);

            UpdateStatusOrderResDTO res = this.orderService.updateStatusOrder(
                    UpdateStatusOrderReqDTO.builder()
                            .userId("admin")
                            .orderId(dto.getOrderId())
                            .status("COMPLETED")
                            .build());
            System.err.println(res);
            ack.acknowledge(); 

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
