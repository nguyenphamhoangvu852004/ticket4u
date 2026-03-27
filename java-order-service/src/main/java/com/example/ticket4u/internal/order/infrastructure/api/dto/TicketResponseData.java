

package com.example.ticket4u.internal.order.infrastructure.api.dto;

import lombok.Data;

@Data
public class TicketResponseData {
    private int code;
    private String message;
    private TicketData data;
}
