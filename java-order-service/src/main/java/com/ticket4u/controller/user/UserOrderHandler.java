package com.ticket4u.controller.user;

import org.springframework.stereotype.Component;

import com.ticket4u.dto.get.GetListOrderByUserReqDto;
import com.ticket4u.dto.get.GetListOrderResDto;
import com.ticket4u.pkg.errorCustom.ErrorCustom;
import com.ticket4u.pkg.response.ApiResponse;
import com.ticket4u.service.IOrderService;

@Component("UserOrderHandlers")
public class UserOrderHandler {

    private final IOrderService orderService;

    public UserOrderHandler(IOrderService orderService) {
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
