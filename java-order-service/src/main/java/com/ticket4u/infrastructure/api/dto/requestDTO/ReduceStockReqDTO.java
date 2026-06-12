package com.ticket4u.infrastructure.api.dto.requestDTO;

import java.util.List;

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
public class ReduceStockReqDTO {
    private String orderId;
    private List<ReduceStockTicketDTO> tickets;
}