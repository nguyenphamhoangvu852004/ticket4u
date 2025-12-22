package com.example.ticket4u.internal.order.presentation.http.user;

import org.springframework.stereotype.Component;

import com.example.ticket4u.internal.order.application.dto.get.GetListOrderByUserReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderResDto;
import com.example.ticket4u.internal.order.application.service.OrderServiceInterface;
import com.example.ticket4u.pkg.errorCustom.ErrorCustom;
import com.example.ticket4u.pkg.response.ApiResponse;

@Component("UserOrderHandlers")
public class UserOrderHandler {

    private final OrderServiceInterface orderService;

    public UserOrderHandler(OrderServiceInterface orderService) {
        this.orderService = orderService;
    }

    public ApiResponse getListOrderByUserHandler(GetListOrderByUserReqDto reqDto) {
        try {
            GetListOrderResDto resDto = this.orderService.getListOrderByUser(reqDto);
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

    // public ApiResponse GetOrderByIDHandler(GetOrderByIDReqDto reqDto) {

}
