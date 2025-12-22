package com.example.ticket4u.internal.order.application.dto.get;

import java.util.List;

import com.example.ticket4u.pkg.response.PaginationResponse;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetListOrderResDto {
    @JsonProperty("orders")
    private List<OrderResDto> orders;
    @JsonProperty("metadata")
    private PaginationResponse paginationResponse;
}