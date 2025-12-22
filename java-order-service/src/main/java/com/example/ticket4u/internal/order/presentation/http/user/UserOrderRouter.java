package com.example.ticket4u.internal.order.presentation.http.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ticket4u.internal.anotation.RequireLogin;
import com.example.ticket4u.internal.middlewares.UserLoginJWTPayload;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderByUserReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderResDto;
import com.example.ticket4u.pkg.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;

@RestController("UserOrderRouters")
@RequestMapping("/users/orders")
public class UserOrderRouter {

    private final UserOrderHandler orderHandler;

    public UserOrderRouter(UserOrderHandler orderHandler) {
        this.orderHandler = orderHandler;
    }

    @Operation(summary = "Get list order by user with pagination")
    @RequireLogin
    @GetMapping("")
    public ResponseEntity<ApiResponse<GetListOrderResDto>> getOrders(
            HttpServletRequest httpRequest,
            @RequestParam(required = false, defaultValue = "1") String page,
            @RequestParam(required = false, defaultValue = "10") String size) {

        UserLoginJWTPayload payload = (UserLoginJWTPayload) httpRequest.getAttribute("userPayloadJWTDecoded");
        ApiResponse<GetListOrderResDto> response = orderHandler.getListOrderByUserHandler(new GetListOrderByUserReqDto(page, size,payload.getId()));
        return ResponseEntity.status(response.getCode()).body(response);
    }

}
