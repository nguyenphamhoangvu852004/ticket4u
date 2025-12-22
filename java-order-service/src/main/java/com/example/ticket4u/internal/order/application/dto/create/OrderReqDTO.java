package com.example.ticket4u.internal.order.application.dto.create;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderReqDTO {

    @Size(min = 36, max = 36, message = "User ID must be exactly 36 characters long")
    @NotBlank(message = "Ticket UUID must not be blank")
    @NotEmpty(message = "Ticket UUID must not be empty")
    @JsonProperty("id")
    private String ticketUuid;

    @Min(value = 1, message = "Quantity must be at least 1, but was {value}")
    @JsonProperty("quantity")
    private int quantity;
}
