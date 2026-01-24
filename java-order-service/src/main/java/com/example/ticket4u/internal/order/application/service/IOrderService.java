package com.example.ticket4u.internal.order.application.service;

import com.example.ticket4u.internal.order.application.dto.create.CreateOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.create.CreateOrderResDTO;
import com.example.ticket4u.internal.order.application.dto.delete.SoftDeleteOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.delete.SoftDeleteOrderResDTO;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderByUserReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderResDto;
import com.example.ticket4u.internal.order.application.dto.get.GetOrderByIDReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetOrderByIDResDto;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderResDTO;

public interface IOrderService {
    public CreateOrderResDTO createOrder(CreateOrderReqDTO createReq);

    public GetListOrderResDto getListOrder(GetListOrderReqDto getListOrderReqDto);

    public GetOrderByIDResDto getOrderById(GetOrderByIDReqDto getListOrderReqDto) ;

    public GetListOrderResDto getListOrderByUser(GetListOrderByUserReqDto getListOrderReqDto) ;

    public UpdateStatusOrderResDTO updateStatusOrder(UpdateStatusOrderReqDTO reqDto);

    public  SoftDeleteOrderResDTO softDeleteOrder(SoftDeleteOrderReqDTO reqDto, String orderId);

}
