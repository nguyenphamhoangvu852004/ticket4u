package com.example.ticket4u.internal.order.infrastructure.api.dto.requestDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReduceStockTicketDTO {
    private String ticketId;
    private int amount;
}