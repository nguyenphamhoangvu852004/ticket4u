package com.example.ticket4u.internal.order.infrastructure.repositoryImplementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.ticket4u.internal.order.domain.entity.OrderEntity;
import com.example.ticket4u.internal.order.domain.repositoryInterface.OrderRepositoryInterface;
import com.example.ticket4u.internal.order.infrastructure.jpa.OrderJPARepository;
import com.example.ticket4u.internal.order.infrastructure.jpa.model.OrderModelSchema;
import com.example.ticket4u.pkg.errorCustom.ErrorCustom;


@Repository
public class OrderRepositoryImplementation implements OrderRepositoryInterface {
    private OrderJPARepository orderJPARepository;

    public OrderRepositoryImplementation(OrderJPARepository orderJPARepository) {
        this.orderJPARepository = orderJPARepository;
    }

    @Transactional
    @Override
    public List<OrderEntity> getMany(int page, int size) {
        List<OrderEntity> listEntity = new ArrayList<OrderEntity>();
        Page<OrderModelSchema> pageResult = this.orderJPARepository.findAll(PageRequest.of(page - 1, size));
        if (pageResult.getContent().isEmpty()) {
            return new ArrayList<OrderEntity>();
        }
        for(OrderModelSchema model: pageResult.getContent()){
            System.out.println(model.toEntity().toString());
            if (model.toEntity().getDeletedAt() != 0) {
                continue;
            }
            listEntity.add(model.toEntity());
        }
        return listEntity;
    }

    @Override
    public OrderEntity create(OrderEntity orderEntity) {
        try {
        return this.orderJPARepository.save(new OrderModelSchema().toModelSchema(orderEntity)).toEntity();
        } catch ( IllegalArgumentException e) {
            throw new ErrorCustom(404, e.getMessage());
        }
    }

    @Transactional
    @Override
    public OrderEntity update(OrderEntity orderEntity) {
        return this.orderJPARepository.save(new OrderModelSchema().toModelSchema(orderEntity)).toEntity();
    }

    @Override
    public void delete(String entityId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public OrderEntity getOne(String entityId) {
      Optional<OrderModelSchema> model = this.orderJPARepository.findById(entityId);
      if (model.isEmpty()) {
          throw new ErrorCustom(404,"Order not found");
      }
        return model.get().toEntity();
    }

    @Override
    public int getCount() {
        Long count = this.orderJPARepository.count();
        return count.intValue();
    }

    @Override
    public List<OrderEntity> getManyByUser(String userId, int page, int size) {
        List<OrderEntity> listEntity = new ArrayList<OrderEntity>();
        Page<OrderModelSchema> pageResult = this.orderJPARepository.findAllByUserId(userId, PageRequest.of(page - 1, size));
        if (pageResult.getContent().isEmpty()) {
            return new ArrayList<OrderEntity>();
        }
        for(OrderModelSchema model: pageResult.getContent()){
            System.out.println(model.toEntity().toString());
            if (model.toEntity().getDeletedAt() != 0) {
                continue;
            }
            listEntity.add(model.toEntity());
        }
        return listEntity;
    }

}
