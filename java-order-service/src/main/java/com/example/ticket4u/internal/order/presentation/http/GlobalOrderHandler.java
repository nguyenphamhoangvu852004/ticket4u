package com.example.ticket4u.internal.order.presentation.http;

import org.springframework.stereotype.Component;

import com.example.ticket4u.internal.kafka.KafkaProducerService;
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
import com.example.ticket4u.internal.order.application.service.IOrderService;
import com.example.ticket4u.pkg.errorCustom.ErrorCustom;
import com.example.ticket4u.pkg.response.ApiResponse;

@Component("GlobalOrderHandlers")
public class GlobalOrderHandler {
    private final IOrderService orderService;

    public GlobalOrderHandler(IOrderService orderService) {
        this.orderService = orderService;
    }

    public ApiResponse createOrderHandler(CreateOrderReqDTO reqDto) {
        try {
            CreateOrderResDTO resDto = this.orderService.createOrder(reqDto);
            return ApiResponse.success(resDto);
        } catch (Exception e) {
            return ApiResponse.error(500, "Internal Server Error", e.getMessage());
        }
    }

    public ApiResponse getOrderByIDHandler(GetOrderByIDReqDto reqDto) {
        try {
            GetOrderByIDResDto resDto = this.orderService.getOrderById(reqDto);
            return ApiResponse.success(resDto);
        } catch (Exception e) {
            if (e instanceof ErrorCustom){
                return ApiResponse.error(((ErrorCustom) e).getCode(), e.getMessage(), e.getMessage());
            }else{
                return ApiResponse.error(500, "Internal Server Error", e.getMessage());
            }
        }
    }

    public ApiResponse getListOrderHandler(GetListOrderReqDto reqDto) {
        try {
            GetListOrderResDto resDto = orderService.getListOrder(reqDto);
            return ApiResponse.success(resDto);
        } catch (Exception e) {
            return ApiResponse.error(500, "Internal Server Error", e.getMessage());
        }
    }

    // public ApiResponse updateStatusOrderHandler(UpdateStatusOrderReqDTO reqDto, String orderId) {
    //     try {
    //         UpdateStatusOrderResDTO resDto = orderService.updateStatusOrder(reqDto, orderId);
    //         return ApiResponse.success(resDto);
    //     } catch (Exception e) {
    //         return ApiResponse.error(500, "Internal Server Error", e.getMessage());
    //     }
    // }

    public ApiResponse softDeleteOrderHandler(SoftDeleteOrderReqDTO reqDto, String orderId) {
        try {
            SoftDeleteOrderResDTO resDto = orderService.softDeleteOrder(reqDto, orderId);
            return ApiResponse.success(resDto);
        } catch (Exception e) {
            return ApiResponse.error(500, "Internal Server Error", e.getMessage());
        }
    }
}
