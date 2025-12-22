package com.example.ticket4u.internal.order.application.dto.get;

import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class GetListOrderReqDto {
    @JsonAlias("page")
    private String page;

    @JsonAlias("size")
    private String size;
}
