package com.ticket4u.infrastructure.api.dto;

import lombok.Data;

@Data
public class TicketData {
    private String id;
    private String title;
    private int price;
    private String status;
    private int totalQuantity;
    private int soldQuantity;
    private String eventTimeId;
    private String createdAt;
    private String updatedAt;
}
