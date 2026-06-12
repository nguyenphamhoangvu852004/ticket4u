package com.ticket4u.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticket4u.dto.update.UpdateStatusOrderReqDTO;
import com.ticket4u.dto.update.UpdateStatusOrderResDTO;
import com.ticket4u.kafka.dto.PaymentSuccessDto;
import com.ticket4u.service.IOrderService;

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
