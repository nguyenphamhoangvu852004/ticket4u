package com.example.ticket4u.internal.order.presentation.http.admin;

import org.springframework.stereotype.Component;

import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderResDTO;
import com.example.ticket4u.internal.order.application.service.OrderServiceInterface;
import com.example.ticket4u.pkg.errorCustom.ErrorCustom;
import com.example.ticket4u.pkg.response.ApiResponse;

@Component("AdminOrderHandlers")
public class AdminOrderHandler {

    private final OrderServiceInterface orderService;

    public AdminOrderHandler(OrderServiceInterface orderService) {
        this.orderService = orderService;
    }

    public ApiResponse updateStatusOrderHandler(UpdateStatusOrderReqDTO reqDto) {
        try {
            UpdateStatusOrderResDTO resDto = this.orderService.updateStatusOrder(reqDto);
            return ApiResponse.success(resDto);
        } catch (Exception e) {
            if (e instanceof ErrorCustom) {
                return ApiResponse.error(((ErrorCustom) e).getCode(), e.getMessage(),
                        e.getMessage());
            } else {
                return ApiResponse.error(500, "Internal Server Error", e.getMessage());
            }
        }
    }
    
}
