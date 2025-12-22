package com.example.ticket4u.internal.order.application.dto.get;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResDto {
    private String orderId;
    private String userId;
    private String status;
    private String createdAt;
    private String modifiedAt;
    

}