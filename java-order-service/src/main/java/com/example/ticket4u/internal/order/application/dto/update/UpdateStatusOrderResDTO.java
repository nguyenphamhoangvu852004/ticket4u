package com.example.ticket4u.internal.order.application.dto.update;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateStatusOrderResDTO {
    @JsonProperty("orderId")
    private String orderId;
    @JsonProperty("statusNow")
    private String statusNow;
    @JsonProperty("modifiedAt")
    private String modifiedAt;
}
