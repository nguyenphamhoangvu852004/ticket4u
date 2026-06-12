package com.ticket4u.dto.get;

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
    private String totalPrice;
    private String createdAt;
    private String modifiedAt;

}