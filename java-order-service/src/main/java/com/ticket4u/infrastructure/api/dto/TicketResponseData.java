
package com.ticket4u.infrastructure.api.dto;

import lombok.Data;

@Data
public class TicketResponseData<T> {
    private int code;
    private String message;
    private T data;
}
