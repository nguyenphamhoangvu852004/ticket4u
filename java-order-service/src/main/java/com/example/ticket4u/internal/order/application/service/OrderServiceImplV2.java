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
import com.example.ticket4u.internal.order.domain.repositoryInterface.IOrderRepository;

public class OrderServiceImplV2 implements IOrderService {

    private final IOrderRepository orderRepo;

    @Override
    public CreateOrderResDTO createOrder(CreateOrderReqDTO createReq) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createOrder'");
    }

    @Override
    public GetListOrderResDto getListOrder(GetListOrderReqDto getListOrderReqDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getListOrder'");
    }

    @Override
    public GetOrderByIDResDto getOrderById(GetOrderByIDReqDto getListOrderReqDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getOrderById'");
    }

    @Override
    public GetListOrderResDto getListOrderByUser(GetListOrderByUserReqDto getListOrderReqDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getListOrderByUser'");
    }

    @Override
    public UpdateStatusOrderResDTO updateStatusOrder(UpdateStatusOrderReqDTO reqDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateStatusOrder'");
    }

    @Override
    public SoftDeleteOrderResDTO softDeleteOrder(SoftDeleteOrderReqDTO reqDto, String orderId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'softDeleteOrder'");
    }

}
