package com.ticket4u.presentation.http;

import org.springframework.stereotype.Component;

import com.ticket4u.dto.create.CreateOrderReqDTO;
import com.ticket4u.dto.create.CreateOrderResDTO;
import com.ticket4u.dto.delete.SoftDeleteOrderReqDTO;
import com.ticket4u.dto.delete.SoftDeleteOrderResDTO;
import com.ticket4u.dto.get.GetListOrderReqDto;
import com.ticket4u.dto.get.GetListOrderResDto;
import com.ticket4u.dto.get.GetOrderByIDReqDto;
import com.ticket4u.dto.get.GetOrderByIDResDto;
import com.ticket4u.dto.update.UpdateStatusOrderReqDTO;
import com.ticket4u.dto.update.UpdateStatusOrderResDTO;
import com.ticket4u.kafka.KafkaProducerService;
import com.ticket4u.pkg.errorCustom.ErrorCustom;
import com.ticket4u.pkg.response.ApiResponse;
import com.ticket4u.service.IOrderService;

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

    public ApiResponse createOrderHandlerPerfomance(String version, CreateOrderReqDTO reqDto) {
        try {
            CreateOrderResDTO resDto = null;
            switch (version) {
                case "1":
                    resDto = this.orderService.createOrderSynchronousWithNoCaching(reqDto);
                    break;
                case "2":
                    resDto = this.orderService.createOrderSynchronousWithCaching(reqDto);
                    break;
                case "3":
                    resDto = this.orderService.createOrderWithCahingAndKafkaAsynchronous(reqDto);
                    break;
            }
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
            if (e instanceof ErrorCustom) {
                return ApiResponse.error(((ErrorCustom) e).getCode(), e.getMessage(), e.getMessage());
            } else {
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

    // public ApiResponse updateStatusOrderHandler(UpdateStatusOrderReqDTO reqDto,
    // String orderId) {
    // try {
    // UpdateStatusOrderResDTO resDto = orderService.updateStatusOrder(reqDto,
    // orderId);
    // return ApiResponse.success(resDto);
    // } catch (Exception e) {
    // return ApiResponse.error(500, "Internal Server Error", e.getMessage());
    // }
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
