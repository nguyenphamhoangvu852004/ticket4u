package com.ticket4u.service;

import com.ticket4u.dto.create.CreateOrderReqDTO;
import com.ticket4u.dto.create.CreateOrderResDTO;
import com.ticket4u.dto.delete.SoftDeleteOrderReqDTO;
import com.ticket4u.dto.delete.SoftDeleteOrderResDTO;
import com.ticket4u.dto.get.GetListOrderByUserReqDto;
import com.ticket4u.dto.get.GetListOrderReqDto;
import com.ticket4u.dto.get.GetListOrderResDto;
import com.ticket4u.dto.get.GetOrderByIDReqDto;
import com.ticket4u.dto.get.GetOrderByIDResDto;
import com.ticket4u.dto.update.UpdateStatusOrderReqDTO;
import com.ticket4u.dto.update.UpdateStatusOrderResDTO;

public interface IOrderService {
    public CreateOrderResDTO createOrder(CreateOrderReqDTO createReq);

    public CreateOrderResDTO createOrderSynchronousWithNoCaching(CreateOrderReqDTO createReq);

    public CreateOrderResDTO createOrderSynchronousWithCaching(CreateOrderReqDTO createReq);

    public CreateOrderResDTO createOrderWithCahingAndKafkaAsynchronous(CreateOrderReqDTO createReq);

    public GetListOrderResDto getListOrder(GetListOrderReqDto getListOrderReqDto);

    public GetOrderByIDResDto getOrderById(GetOrderByIDReqDto getListOrderReqDto);

    public GetListOrderResDto getListOrderByUser(GetListOrderByUserReqDto getListOrderReqDto);

    public UpdateStatusOrderResDTO updateStatusOrder(UpdateStatusOrderReqDTO reqDto);

    public SoftDeleteOrderResDTO softDeleteOrder(SoftDeleteOrderReqDTO reqDto, String orderId);

}
