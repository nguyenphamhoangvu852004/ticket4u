package com.example.ticket4u.internal.order.application.dto.get;

import java.util.List;

import com.example.ticket4u.pkg.response.PaginationResponse;

public class GetListOrderByUserResDto extends GetListOrderResDto {
    public GetListOrderByUserResDto() {
    }
    public GetListOrderByUserResDto(List<OrderResDto> orders, PaginationResponse paginationResponse) {
        super(orders, paginationResponse);
    }
    @Override
    public List<OrderResDto> getOrders() {
        // TODO Auto-generated method stub
        return super.getOrders();
    }
    @Override
    public PaginationResponse getPaginationResponse() {
        // TODO Auto-generated method stub
        return super.getPaginationResponse();
    }
    @Override
    public void setOrders(List<OrderResDto> orders) {
        // TODO Auto-generated method stub
        super.setOrders(orders);
    }
    @Override
    public void setPaginationResponse(PaginationResponse paginationResponse) {
        // TODO Auto-generated method stub
        super.setPaginationResponse(paginationResponse);
    }

}
