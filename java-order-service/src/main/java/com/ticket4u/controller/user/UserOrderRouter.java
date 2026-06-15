package com.ticket4u.controller.user;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticket4u.dto.get.GetListOrderByUserReqDto;
import com.ticket4u.dto.get.GetListOrderReqDto;
import com.ticket4u.dto.get.GetListOrderResDto;
import com.ticket4u.pkg.response.ApiResponse;

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
    @GetMapping("")
    public ResponseEntity<ApiResponse<GetListOrderResDto>> getOrders(
            HttpServletRequest httpRequest,
            @RequestParam(required = false, defaultValue = "1") String page,
            @RequestParam(required = false, defaultValue = "10") String size) {

        ApiResponse<GetListOrderResDto> response = orderHandler.getListOrderByUserHandler(new GetListOrderByUserReqDto(page, size,UUID.randomUUID().toString()));
        return ResponseEntity.status(response.getCode()).body(response);
    }

}
