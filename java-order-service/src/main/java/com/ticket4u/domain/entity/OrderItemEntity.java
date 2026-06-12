package com.ticket4u.domain.entity;

import com.ticket4u.pkg.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemEntity extends BaseEntity {
    private String uuid;
    private String ticketUuid;
    private int quantity;
    private String orderUuid;

    public boolean isValid() {
        if (this.quantity <= 0) {
            return false;
        }
        if (this.ticketUuid == null || this.ticketUuid.isEmpty()) {
            return false;
        }
        if (this.orderUuid == null || this.orderUuid.isEmpty()) {
            return false;
        }
        return true;
    }

}
