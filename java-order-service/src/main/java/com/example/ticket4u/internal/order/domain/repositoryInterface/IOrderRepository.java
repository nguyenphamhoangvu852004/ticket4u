package com.example.ticket4u.internal.order.domain.repositoryInterface;

import java.util.List;

import com.example.ticket4u.internal.order.domain.entity.OrderEntity;

public interface IOrderRepository  {

    public OrderEntity getOne(String entityId);

    public List<OrderEntity> getMany(int page, int size);

    public OrderEntity create(OrderEntity orderEntity);

    public OrderEntity update(OrderEntity orderEntity);

    public void delete(String entityId);

    public int getCount();

    public List<OrderEntity> getManyByUser(String userId,int page, int size);
}
