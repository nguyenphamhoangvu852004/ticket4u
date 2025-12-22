package com.example.ticket4u.internal.order.application.dto.update;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateStatusOrderReqDTO {
    private String status;
    private String userId;
    private String orderId;
}
