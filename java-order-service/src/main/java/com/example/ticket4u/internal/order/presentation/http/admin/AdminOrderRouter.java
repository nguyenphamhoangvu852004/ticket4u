package com.example.ticket4u.internal.order.presentation.http.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ticket4u.internal.anotation.RequireLogin;
import com.example.ticket4u.internal.middlewares.UserLoginJWTPayload;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderResDTO;
import com.example.ticket4u.pkg.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;

@RestController("AdminOrderRouters")
@RequestMapping("/admins/orders")
public class AdminOrderRouter {

    private final AdminOrderHandler orderHandler;

    public AdminOrderRouter(AdminOrderHandler orderHandler) {
        this.orderHandler = orderHandler;
    }

    @Operation(summary = "Update status order (admin)")
    @PutMapping("")
    @RequireLogin
    public ResponseEntity<ApiResponse<UpdateStatusOrderResDTO>> updateStatusOrder(
            HttpServletRequest httpRequest,
        @RequestBody() UpdateStatusOrderReqDTO reqData) {

        UserLoginJWTPayload payload = (UserLoginJWTPayload) httpRequest.getAttribute("userPayloadJWTDecoded");

        UpdateStatusOrderReqDTO reqDto = new UpdateStatusOrderReqDTO();
        reqDto.setOrderId(reqData.getOrderId());
        reqDto.setStatus(reqData.getStatus());
        reqDto.setUserId(payload.getId());

        ApiResponse<UpdateStatusOrderResDTO> response = orderHandler.updateStatusOrderHandler(
                reqDto);

        return ResponseEntity.status(response.getCode()).body(response);
    }

}
