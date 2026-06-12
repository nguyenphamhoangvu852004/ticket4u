package com.ticket4u.dto.get;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetOrderByIDReqDto {
    private String orderId;
    public GetOrderByIDReqDto() {}
    public GetOrderByIDReqDto(String orderId) {
        this.orderId = orderId;
    }
}
