package com.example.ticket4u.internal.order.infrastructure.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.ticket4u.internal.order.infrastructure.jpa.model.OrderModelSchema;

public interface OrderJPARepository extends JpaRepository<OrderModelSchema, String> {

    @Query("SELECT o FROM orders o WHERE o.userId = :userId")
    Page<OrderModelSchema> findAllByUserId(
            @Param("userId") String userId,
            Pageable pageable);
    

}
