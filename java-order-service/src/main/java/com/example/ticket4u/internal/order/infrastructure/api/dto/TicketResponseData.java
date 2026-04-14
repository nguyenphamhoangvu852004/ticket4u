
package com.example.ticket4u.internal.order.infrastructure.api.dto;

import lombok.Data;

@Data
public class TicketResponseData<T> {
    private int code;
    private String message;
    private T data;
}
