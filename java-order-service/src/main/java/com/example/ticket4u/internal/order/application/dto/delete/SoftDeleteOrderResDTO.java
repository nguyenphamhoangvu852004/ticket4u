package com.example.ticket4u.internal.order.application.dto.delete;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SoftDeleteOrderResDTO {
    private String orderId;
    private String deletedAt;
}
