package com.example.ticket4u.internal.order.application.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.ticket4u.internal.kafka.KafkaProducerService;
import com.example.ticket4u.internal.order.application.dto.create.CreateOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.create.CreateOrderResDTO;
import com.example.ticket4u.internal.order.application.dto.delete.SoftDeleteOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.delete.SoftDeleteOrderResDTO;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderByUserReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetListOrderResDto;
import com.example.ticket4u.internal.order.application.dto.get.GetOrderByIDReqDto;
import com.example.ticket4u.internal.order.application.dto.get.GetOrderByIDResDto;
import com.example.ticket4u.internal.order.application.dto.get.OrderItemResDto;
import com.example.ticket4u.internal.order.application.dto.get.OrderResDto;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderReqDTO;
import com.example.ticket4u.internal.order.application.dto.update.UpdateStatusOrderResDTO;
import com.example.ticket4u.internal.order.application.service.OrderServiceImplementation.ProduceCreatedOrderMessage.Items;
import com.example.ticket4u.internal.order.domain.entity.OrderEntity;
import com.example.ticket4u.internal.order.domain.entity.OrderStatusEnum;
import com.example.ticket4u.internal.order.domain.repositoryInterface.OrderRepositoryInterface;
import com.example.ticket4u.internal.order.domain.repositoryInterface.ProductClientInterface;
import com.example.ticket4u.internal.order.domain.repositoryInterface.UserClientInterface;
import com.example.ticket4u.internal.order.infrastructure.api.dto.TicketResDto;
import com.example.ticket4u.internal.orderItem.domain.entity.OrderItem;
import com.example.ticket4u.internal.orderItem.domain.repositoryInterface.OrderItemRepositoryInterface;
import com.example.ticket4u.pkg.errorCustom.ErrorCustom;
import com.example.ticket4u.pkg.errorCustom.NotFound;
import com.example.ticket4u.pkg.response.PaginationResponse;
import com.example.ticket4u.utils.TimeUtils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Service
@AllArgsConstructor
public class OrderServiceImplementation implements OrderServiceInterface {
    private final OrderRepositoryInterface orderRepo;
    private final OrderItemRepositoryInterface orderItemRepo;
    private final UserClientInterface userClient;
    private final ProductClientInterface productClient;
    private final KafkaProducerService kafkaProducerService;

    @Override
    public CreateOrderResDTO createOrder(CreateOrderReqDTO createReq) {

        // check user
        if (!userClient.IsExists(createReq.getUserId())) {
            throw new IllegalArgumentException("User does not exist");
        }

        List<OrderItem> orderItems = new ArrayList<>();
        // check products
        for (var item : createReq.getOrderItems()) {
            TicketResDto ticketResDto;
            ticketResDto = productClient.getTicketById(item.getTicketUuid());
            if (ticketResDto.getData() == null) {
                throw new ErrorCustom(404, "Product not found");
            }
            if (ticketResDto.getData().getTotalQuantity() == 0
                    || ticketResDto.getData().getTotalQuantity() < item.getQuantity()) {
                throw new IllegalArgumentException("Product is not enough: " + item.getTicketUuid());
            }
            OrderItem orderItem = OrderItem.builder()
                    .ticketUuid(item.getTicketUuid())
                    .quantity(item.getQuantity())
                    .build();
            orderItems.add(orderItem);
        }

        // create order
        OrderEntity orderEntity = OrderEntity.builder()
                .id(UUID.randomUUID().toString())
                .status(OrderStatusEnum.PENDING)
                .userId(createReq.getUserId())
                .items(orderItems)
                .creatorId(createReq.getUserId())
                .modifierId(createReq.getUserId())
                .deletorId("")
                .createdAt((int) (System.currentTimeMillis() / 1000L))
                .modifiedAt((int) (System.currentTimeMillis() / 1000L))
                .deletedAt(0)
                .build();

        OrderEntity orderEntityCreated = orderRepo.create(orderEntity);
        if (orderEntityCreated.getId() == null || orderEntityCreated.getId().isBlank()) {
            throw new RuntimeException("Create order failed");
        }

        // create orderItems
        for (var item : orderEntity.getItems()) {
            System.out.println(item.toString());
            OrderItem orderItem = OrderItem.builder()
                    .uuid(UUID.randomUUID().toString())
                    .ticketUuid(item.getTicketUuid())
                    .quantity(item.getQuantity())
                    .orderUuid(orderEntityCreated.getId())
                    .createdAt(orderEntityCreated.getCreatedAt())
                    .modifiedAt(orderEntityCreated.getModifiedAt())
                    .deletedAt(0)
                    .creatorId(orderEntityCreated.getCreatorId())
                    .modifierId(orderEntityCreated.getModifierId())
                    .deletorId("")
                    .build();

            OrderItem saved = orderItemRepo.CreateOrderItem(orderItem);
            if (saved.getUuid() == null || saved.getUuid().isBlank()) {
                throw new RuntimeException("Create orderItem failed");
            }
        }
        ProduceCreatedOrderMessage message = new ProduceCreatedOrderMessage();
        message.setUserId(createReq.getUserId());
        message.setOrderId(orderEntityCreated.getId());
        message.setItems(new ArrayList<Items>());
        for (var item : createReq.getOrderItems()) {
            Items items = new Items();
            items.setId(item.getTicketUuid());
            items.setQuantity(item.getQuantity());
            message.getItems().add(items);
        }

        this.kafkaProducerService.sendMessage("order.created", message);
        System.out.println("Sending to Kafka: " + createReq.toJson());

        return new CreateOrderResDTO(orderEntityCreated.getId());
    }

    @Override
    public GetListOrderResDto getListOrder(GetListOrderReqDto getListOrderReqDto) {
        try {
            int page = Integer.parseInt(getListOrderReqDto.getPage());
            int size = 0;

            List<OrderEntity> listOrderEntity = this.orderRepo.getMany(
                    Integer.parseInt(getListOrderReqDto.getPage()),
                    Integer.parseInt(getListOrderReqDto.getSize()));
            List<OrderResDto> listOrderResDto = new ArrayList<>();

            for (OrderEntity orderEntity : listOrderEntity) {
                OrderResDto orderResDto = OrderResDto.builder()
                        .orderId(orderEntity.getId())
                        .userId(orderEntity.getUserId())
                        .status(orderEntity.getStatus().toString())
                        .createdAt(TimeUtils.formatFromSeconds(orderEntity.getCreatedAt()))
                        .modifiedAt(TimeUtils.formatFromSeconds(orderEntity.getModifiedAt()))
                        .build();
                listOrderResDto.add(orderResDto);
                size++;
            }

            int totalItem = this.orderRepo.getCount();

            int totalSize = totalItem % size == 0 ? totalItem / size : totalItem / size + 1;
            return new GetListOrderResDto(listOrderResDto, new PaginationResponse(
                    page,
                    size, totalSize, totalItem));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public GetOrderByIDResDto getOrderById(GetOrderByIDReqDto getListOrderReqDto) {
        try {
            OrderEntity orderEntity = this.orderRepo.getOne(getListOrderReqDto.getOrderId());
            List<OrderItem> listOrderItem = this.orderItemRepo.GetManyByOrderID(orderEntity.getId());
            List<OrderItemResDto> listOrderItemResDto = new ArrayList<OrderItemResDto>();
            Double totalPrice = 0.0;
            for (int i = 0; i < listOrderItem.size(); i++) {
                // gọi service events ticket để lấy giá

                TicketResDto ticketResDto = this.productClient.getTicketById(listOrderItem.get(i).getTicketUuid());
                if (ticketResDto.getData() == null) {
                    throw new RuntimeException("Ticket not found");
                }
                totalPrice += ticketResDto.getData().getPrice() * listOrderItem.get(i).getQuantity();
                listOrderItemResDto.add(new OrderItemResDto().builder()
                        .id(listOrderItem.get(i).getTicketUuid())
                        .quantity(listOrderItem.get(i).getQuantity())
                        .totalPrice(
                                String.valueOf(ticketResDto.getData().getPrice() * listOrderItem.get(i).getQuantity()))
                        .createdAt(TimeUtils.formatFromSeconds(listOrderItem.get(i).getCreatedAt()))
                        .modifiedAt(TimeUtils.formatFromSeconds(listOrderItem.get(i).getModifiedAt()))
                        .build());
            }

            GetOrderByIDResDto resDto = GetOrderByIDResDto.builder()
                    .orderId(orderEntity.getId())
                    .userId(orderEntity.getUserId())
                    .createdAt(TimeUtils.formatFromSeconds(orderEntity.getCreatedAt()))
                    .modifiedAt(TimeUtils.formatFromSeconds(orderEntity.getModifiedAt()))
                    .totalPrice(String.valueOf(totalPrice))
                    .status(orderEntity.getStatus().toString())
                    .orderItems(listOrderItemResDto)
                    .build();

            return resDto;
        } catch (Exception e) {
            if (e instanceof ErrorCustom) {
                throw (ErrorCustom) e;
            } else {
                throw new RuntimeException(e.getMessage());
            }

        }
    }

    @Override
    public UpdateStatusOrderResDTO updateStatusOrder(UpdateStatusOrderReqDTO reqDto) {
        try {
            OrderEntity orderEntity = this.orderRepo.getOne(reqDto.getOrderId());
            if (orderEntity.getStatus().equals(OrderStatusEnum.COMPlETED)) {
                throw new Exception("Order is already completed");
            }

            orderEntity.setStatus(this.getOrderStatus(reqDto.getStatus()));
            orderEntity.setModifiedAt(TimeUtils.getNowSeconds());
            orderEntity.setModifierId(reqDto.getUserId());

            OrderEntity updated = this.orderRepo.update(orderEntity);
            if (!updated.getId().equals(reqDto.getOrderId())) {
                throw new Exception("Update order failed");
            }

            return new UpdateStatusOrderResDTO(
                    orderEntity.getId(),
                    orderEntity.getStatus().toString(),
                    TimeUtils.formatFromSeconds(orderEntity.getModifiedAt()));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public SoftDeleteOrderResDTO softDeleteOrder(SoftDeleteOrderReqDTO reqDto, String orderId) {
        try {
            // tìm order bằng orderid
            OrderEntity orderEntity = this.orderRepo.getOne(orderId);
            if (orderEntity == null || orderEntity.getId() == "") {
                throw new Exception("Order not found");
            }
            orderEntity.setDeletedAt(TimeUtils.getNowSeconds());
            orderEntity.setDeletorId(reqDto.getUserId());
            OrderEntity updated = this.orderRepo.update(orderEntity);

            return new SoftDeleteOrderResDTO(updated.getId(), TimeUtils.formatFromSeconds(updated.getDeletedAt()));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public class ProduceCreatedOrderMessage {
        private String userId;
        private String orderId;
        private List<Items> items;

        @Getter
        @Setter
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Items {
            private String id;
            private int quantity;
        }
    }

    @Override
    public GetListOrderResDto getListOrderByUser(GetListOrderByUserReqDto getListOrderReqDto) {
        try {
            int page = Integer.parseInt(getListOrderReqDto.getPage());
            int size = Integer.parseInt(getListOrderReqDto.getSize());
            if (page < 1)
                page = 1;
            if (size <= 0)
                size = 10;

            System.out.println("🚀 ~ OrderRepositoryImplementation ~ getMany ~ page: " + getListOrderReqDto.getPage()
                    + " size: " + getListOrderReqDto.getSize());
            List<OrderEntity> listOrderEntity = this.orderRepo.getManyByUser(
                    getListOrderReqDto.getUserId(),
                    page,
                    size);
            List<OrderResDto> listOrderResDto = new ArrayList<>();

            for (OrderEntity orderEntity : listOrderEntity) {
                OrderResDto orderResDto = OrderResDto.builder()
                        .orderId(orderEntity.getId())
                        .userId(orderEntity.getUserId())
                        .status(orderEntity.getStatus().toString())
                        .createdAt(TimeUtils.formatFromSeconds(orderEntity.getCreatedAt()))
                        .modifiedAt(TimeUtils.formatFromSeconds(orderEntity.getModifiedAt()))
                        .build();
                listOrderResDto.add(orderResDto);
                size++;
            }

            int totalItem = this.orderRepo.getCount();
            int totalPage = (int) Math.ceil((double) totalItem / size);

            return new GetListOrderResDto(
                    listOrderResDto,
                    new PaginationResponse(page, size, totalPage, totalItem));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }
    private OrderStatusEnum getOrderStatus(String status) {
        switch (status) {
            case "PENDING":
                return OrderStatusEnum.PENDING;
            case "PAID":
                return OrderStatusEnum.PAID;
            case "COMPLETED":
                return OrderStatusEnum.COMPlETED;
            case "CANCELLED":
                return OrderStatusEnum.CANCELLED;
            case "REFUNDED":
                return OrderStatusEnum.REFUNDED;
            default:
                return OrderStatusEnum.PENDING;
        }
    }
}
