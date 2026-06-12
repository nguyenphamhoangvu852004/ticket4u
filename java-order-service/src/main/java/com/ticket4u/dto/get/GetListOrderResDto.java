package com.ticket4u.dto.get;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ticket4u.pkg.response.PaginationResponse;

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