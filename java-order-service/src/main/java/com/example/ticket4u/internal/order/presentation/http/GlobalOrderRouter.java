package com.example.ticket4u.internal.order.presentation.http;

import org.springframework.web.bind.annotation.RestController;

import com.example.ticket4u.internal.anotation.RequireLogin;
import com.example.ticket4u.internal.middlewares.UserLoginJWTPayload;
import com.example.ticket4u.internal.order.application.dto.create.CreateOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.create.CreateOrderResDTO;
import com.example.ticket4u.internal.order.application.dto.delete.SoftDeleteOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.delete.SoftDeleteOrderResDTO;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderResDto;
import com.example.ticket4u.internal.order.application.dto.get.GetOrderByIDReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetOrderByIDResDto;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderResDTO;
import com.example.ticket4u.pkg.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.annotation.HttpConstraint;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.hibernate.annotations.Filter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController("GlobalOrderRouters")
@RequestMapping("/orders")
public class GlobalOrderRouter {
    private final GlobalOrderHandler orderHandler;

    public GlobalOrderRouter(GlobalOrderHandler orderHandler) {
        this.orderHandler = orderHandler;
    }


    @Operation(summary = "Get order by ID")
    @RequireLogin
    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<GetOrderByIDResDto>> getOrderByID(
    @PathVariable("orderId") String param) {
        ApiResponse<GetOrderByIDResDto> response = orderHandler.getOrderByIDHandler(new GetOrderByIDReqDto(param));
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @Operation(summary = "Create new order")
    @RequireLogin
    @PostMapping("")
    public ResponseEntity<ApiResponse<CreateOrderResDTO>> createOrder(HttpServletRequest httpRequest,@RequestBody CreateOrderReqDTO body) {
        @Valid CreateOrderReqDTO reqDto = new CreateOrderReqDTO();
        UserLoginJWTPayload payload = (UserLoginJWTPayload) httpRequest.getAttribute("userPayloadJWTDecoded");
        reqDto.setUserId(payload.getId());
        reqDto.setOrderItems(body.getOrderItems());
        ApiResponse<CreateOrderResDTO> response = orderHandler.createOrderHandler(reqDto);
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @Operation(summary = "Soft delete order by ID")
    @RequireLogin
    @DeleteMapping("/{orderId}")
    public ResponseEntity<ApiResponse<SoftDeleteOrderResDTO>> softDelete(@PathVariable("orderId") String orderId,
            @RequestBody SoftDeleteOrderReqDTO reqDto) {
        ApiResponse<SoftDeleteOrderResDTO> response = orderHandler.softDeleteOrderHandler(reqDto, orderId);
        return ResponseEntity.status(response.getCode()).body(response);
    }

}
