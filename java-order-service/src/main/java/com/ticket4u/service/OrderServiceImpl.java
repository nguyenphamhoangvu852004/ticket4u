package com.ticket4u.service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import com.ticket4u.domain.entity.OrderEntity;
import com.ticket4u.domain.entity.OrderItemEntity;
import com.ticket4u.domain.entity.OrderStatusEnum;
import com.ticket4u.domain.repositoryInterface.IOrderItemRepository;
import com.ticket4u.domain.repositoryInterface.IOrderRepository;
import com.ticket4u.domain.repositoryInterface.IPaymentClient;
import com.ticket4u.domain.repositoryInterface.IProductClient;
import com.ticket4u.dto.create.CreateOrderReqDTO;
import com.ticket4u.dto.create.CreateOrderResDTO;
import com.ticket4u.dto.create.OrderReqDTO;
import com.ticket4u.dto.delete.SoftDeleteOrderReqDTO;
import com.ticket4u.dto.delete.SoftDeleteOrderResDTO;
import com.ticket4u.dto.get.GetListOrderByUserReqDto;
import com.ticket4u.dto.get.GetListOrderReqDto;
import com.ticket4u.dto.get.GetListOrderResDto;
import com.ticket4u.dto.get.GetOrderByIDReqDto;
import com.ticket4u.dto.get.GetOrderByIDResDto;
import com.ticket4u.dto.get.OrderItemResDto;
import com.ticket4u.dto.get.OrderResDto;
import com.ticket4u.dto.update.UpdateStatusOrderReqDTO;
import com.ticket4u.dto.update.UpdateStatusOrderResDTO;
import com.ticket4u.infrastructure.api.dto.PaymentResponseData;
import com.ticket4u.infrastructure.api.dto.TicketData;
import com.ticket4u.infrastructure.api.dto.TicketResponseData;
import com.ticket4u.kafka.KafkaProducerService;
import com.ticket4u.pkg.errorCustom.ErrorCustom;
import com.ticket4u.pkg.response.PaginationResponse;
import com.ticket4u.service.OrderServiceImpl.ProduceCreatedOrderMessage.Items;
import com.ticket4u.utils.TicketCacheService;
import com.ticket4u.utils.TimeUtils;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements IOrderService {
    private final IOrderRepository orderRepo;
    private final IOrderItemRepository orderItemRepo;
    private final IProductClient productClient;
    private final IPaymentClient paymentClient;
    private final KafkaProducerService kafkaProducerService;
    private final RedisTemplate<String, String> redis;
    private final TicketCacheService ticketCacheService;

    @Override
    @Transactional
    public CreateOrderResDTO createOrder(CreateOrderReqDTO createReq) {

        // tránh việc user gửi request trùng lặp
        List<String> itemParts = new ArrayList<>();
        for (OrderReqDTO item : createReq.getOrderItems()) {
            itemParts.add(item.getTicketUuid() + "-" + item.getQuantity());
        }
        Collections.sort(itemParts);
        String rawKey = createReq.getUserId() + ":" + String.join("|", itemParts);

        String idemKey = "order:lock:" + rawKey;

        Boolean isFirst = redis.opsForValue()
                .setIfAbsent(idemKey, "1", Duration.ofSeconds(5));

        if (Boolean.FALSE.equals(isFirst)) {
            throw new RuntimeException("Duplicate request");
        }

        List<String> productIDs = new ArrayList<>();
        for (OrderReqDTO item : createReq.getOrderItems()) {
            productIDs.add(item.getTicketUuid());
        }

        // lấy list
        List<TicketData> tickets = productClient.getTicketsByIds(productIDs).getData();

        // =========================
        // 2. LUA SCRIPT (ATOMIC STOCK)
        // =========================
        String luaScript = """
                    local stock = redis.call("GET", KEYS[1])
                    if not stock then
                        stock = ARGV[2]
                        redis.call("SET", KEYS[1], stock)
                    end

                    stock = tonumber(stock)
                    local quantity = tonumber(ARGV[1])

                    if stock < quantity then
                        return -1
                    end

                    stock = stock - quantity
                    redis.call("SET", KEYS[1], stock)

                    return stock
                """;

        DefaultRedisScript<Long> script = new DefaultRedisScript<>();
        script.setScriptText(luaScript);
        script.setResultType(Long.class);

        // =========================
        // 3. PROCESS ITEMS
        // =========================
        // int totalAmount = 0;
        List<OrderItemEntity> orderItems = new ArrayList<>();

        // để rollback redis nếu DB fail
        List<OrderReqDTO> processedItems = new ArrayList<>();

        int totalAmount = 0;
        for (var item : createReq.getOrderItems()) {

            String ticketId = item.getTicketUuid();
            String redisKey = "stock:product:" + ticketId;

            TicketData ticket = null;
            for (TicketData t : tickets) {
                if (t.getId().equals(ticketId)) {
                    ticket = t;
                    break;
                }
            }

            if (ticket == null) {
                throw new ErrorCustom(404, "Product not found");
            }

            Long remain = this.redis.execute(
                    script,
                    Collections.singletonList(redisKey),
                    String.valueOf(item.getQuantity()),
                    String.valueOf(ticket.getTotalQuantity()));

            if (remain == null || remain < 0) {
                throw new RuntimeException("Out of stock: " + ticketId);
            }

            processedItems.add(item);

            orderItems.add(
                    OrderItemEntity.builder()
                            .ticketUuid(ticketId)
                            .quantity(item.getQuantity())
                            .build());

            totalAmount += item.getQuantity() * ticket.getPrice();
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

        OrderEntity createdOrder;

        try {
            // save order in db
            createdOrder = orderRepo.create(orderEntity);

            if (createdOrder.getId() == null || createdOrder.getId().isBlank()) {
                throw new RuntimeException("Create order failed");
            }

            // save order items in db
            for (var item : orderItems) {

                OrderItemEntity orderItem = OrderItemEntity.builder()
                        .uuid(UUID.randomUUID().toString())
                        .ticketUuid(item.getTicketUuid())
                        .quantity(item.getQuantity())
                        .orderUuid(createdOrder.getId())
                        .createdAt(createdOrder.getCreatedAt())
                        .modifiedAt(createdOrder.getModifiedAt())
                        .deletedAt(0)
                        .creatorId(createdOrder.getCreatorId())
                        .modifierId(createdOrder.getModifierId())
                        .deletorId("")
                        .build();

                OrderItemEntity saved = orderItemRepo.CreateOrderItem(orderItem);

                if (saved.getUuid() == null || saved.getUuid().isBlank()) {
                    throw new RuntimeException("Create orderItem failed");
                }
            }

        } catch (Exception e) {

            // roll back redis if create order failed
            for (var item : processedItems) {
                redis.opsForValue().increment(
                        "stock:product:" + item.getTicketUuid(),
                        item.getQuantity());
            }

            throw e;
        }

        // sent kafak
        kafkaProducerService.sendMessage("order.created", new ProduceCreatedOrderMessage(
                createReq.getUserId(),
                createdOrder.getId(),
                createReq.getOrderItems().stream().map(i -> new Items(i.getTicketUuid(),
                        i.getQuantity())).toList()));

        PaymentResponseData resp = paymentClient.getPaymentURL(orderEntity.getId(), String.valueOf(totalAmount));

        return new CreateOrderResDTO(createdOrder.getId(), resp.getData().getPayUrl());
    }

    @Override
    @Transactional
    public CreateOrderResDTO createOrderSynchronousWithNoCaching(CreateOrderReqDTO createReq) {

        List<String> listTicketID = new ArrayList<String>();
        createReq.getOrderItems().forEach(item -> listTicketID.add(item.getTicketUuid()));

        List<TicketData> listTicket = new ArrayList<TicketData>();

        TicketResponseData<List<TicketData>> tickets = productClient.getTicketsByIds(listTicketID);
        if (tickets.getData() == null || tickets.getData().isEmpty()) {
            throw new ErrorCustom(400, "Error not found product: " + String.join(",", listTicketID));
        }
        listTicket = tickets.getData();

        String orderId = UUID.randomUUID().toString();
        int createdAt = (int) (System.currentTimeMillis() / 1000L);
        int modifiedAt = (int) (System.currentTimeMillis() / 1000L);
        int deletedAt = 0;
        String deletorId = "";
        Map<String, TicketData> ticketMap = listTicket.stream()
                .collect(Collectors.toMap(
                        TicketData::getId,
                        Function.identity()));
        List<OrderItemEntity> orderItems = new ArrayList<>();

        for (var item : createReq.getOrderItems()) {
            String orderItemId = UUID.randomUUID().toString();
            TicketData ticket = ticketMap.get(item.getTicketUuid());

            if (ticket == null) {
                throw new ErrorCustom(
                        404,
                        "Ticket not found: " + item.getTicketUuid());
            }

            if (item.getQuantity() > ticket.getTotalQuantity()) {
                throw new ErrorCustom(
                        400,
                        "Quantity exceeds available stock");
            }

            OrderItemEntity orderItem = OrderItemEntity.builder()
                    .uuid(orderItemId)
                    .ticketUuid(item.getTicketUuid())
                    .quantity(item.getQuantity())
                    .orderUuid(orderId)
                    .createdAt(createdAt)
                    .creatorId(createReq.getUserId())
                    .modifiedAt(modifiedAt)
                    .modifierId(createReq.getUserId())
                    .deletedAt(deletedAt)
                    .deletorId(deletorId)
                    .build();

            System.err.println("[createOrderV1] built orderItem: " + orderItem);
            orderItems.add(orderItem);
        }

        OrderEntity orderEntity = OrderEntity.builder()
                .id(orderId)
                .status(OrderStatusEnum.PENDING)
                .userId(createReq.getUserId())
                .creatorId(createReq.getUserId())
                .modifierId(createReq.getUserId())
                .deletorId(deletorId)
                .createdAt(createdAt)
                .modifiedAt(modifiedAt)
                .deletedAt(deletedAt)
                .build();

        try {
            OrderEntity createdOrder = this.orderRepo.create(orderEntity);
            if (createdOrder.getId() == null || createdOrder.getId().isBlank()) {
                throw new RuntimeException("Create order failed");
            }
            this.orderItemRepo.saveAll(orderItems);
            this.productClient.reduceStock(orderEntity.getId(), orderItems);
            return new CreateOrderResDTO(createdOrder.getId(), "not today");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

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
                        .totalPrice(String.valueOf(this.calculateTotalPrice(orderEntity.getId())))
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
            List<OrderItemEntity> listOrderItem = this.orderItemRepo.GetManyByOrderID(orderEntity.getId());
            List<OrderItemResDto> listOrderItemResDto = new ArrayList<OrderItemResDto>();
            Double totalPrice = 0.0;
            for (int i = 0; i < listOrderItem.size(); i++) {
                // gọi service events ticket để lấy giá

                TicketResponseData<TicketData> ticketResDto = this.productClient
                        .getTicketById(listOrderItem.get(i).getTicketUuid());
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
            if (orderEntity.getStatus().equals(OrderStatusEnum.COMPLETED)) {
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
                        .totalPrice(String.valueOf(this.calculateTotalPrice(orderEntity.getId())))
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

    private Double calculateTotalPrice(String orderId) {
        List<OrderItemEntity> listOrderItem = this.orderItemRepo.GetManyByOrderID(orderId);
        Double totalPrice = 0.0;
        for (OrderItemEntity item : listOrderItem) {
            TicketResponseData<TicketData> ticketResDto = this.productClient.getTicketById(item.getTicketUuid());
            if (ticketResDto != null && ticketResDto.getData() != null) {
                totalPrice += ticketResDto.getData().getPrice() * item.getQuantity();
            }
        }
        return totalPrice;
    }

    private OrderStatusEnum getOrderStatus(String status) {
        switch (status) {
            case "PENDING":
                return OrderStatusEnum.PENDING;
            case "PAID":
                return OrderStatusEnum.PAID;
            case "COMPLETED":
                return OrderStatusEnum.COMPLETED;
            case "CANCELLED":
                return OrderStatusEnum.CANCELLED;
            case "REFUNDED":
                return OrderStatusEnum.REFUNDED;
            default:
                return OrderStatusEnum.PENDING;
        }
    }

    @Override
    public CreateOrderResDTO createOrderSynchronousWithCaching(CreateOrderReqDTO createReq) {
        List<String> listTicketID = new ArrayList<String>();
        createReq.getOrderItems().forEach(item -> listTicketID.add(item.getTicketUuid()));

        List<TicketData> listTicket = new ArrayList<TicketData>();

        List<TicketData> cached = this.ticketCacheService.getTicketsByIds(listTicketID);
        boolean cacheHitAll = cached != null
                && cached.stream().map(TicketData::getId).collect(Collectors.toSet())
                        .containsAll(listTicketID);

        if (cacheHitAll) {
            listTicket = cached;
        } else {
            TicketResponseData<List<TicketData>> tickets = productClient.getTicketsByIds(listTicketID);
            if (tickets.getData() == null || tickets.getData().isEmpty()) {
                throw new ErrorCustom(400, "Error not found product: " + String.join(",", listTicketID));
            }
            listTicket = tickets.getData();
            // save cache
            this.ticketCacheService.saveTickets(listTicket);
        }

        // 2. build order items
        String orderId = UUID.randomUUID().toString();
        int createdAt = (int) (System.currentTimeMillis() / 1000L);
        int modifiedAt = (int) (System.currentTimeMillis() / 1000L);
        int deletedAt = 0;
        String deletorId = "";
        Map<String, TicketData> ticketMap = listTicket.stream()
                .collect(Collectors.toMap(
                        TicketData::getId,
                        Function.identity()));
        List<OrderItemEntity> orderItems = new ArrayList<>();

        for (var item : createReq.getOrderItems()) {
            String orderItemId = UUID.randomUUID().toString();
            TicketData ticket = ticketMap.get(item.getTicketUuid());

            if (ticket == null) {
                throw new ErrorCustom(
                        404,
                        "Ticket not found: " + item.getTicketUuid());
            }

            if (item.getQuantity() > ticket.getTotalQuantity()) {
                throw new ErrorCustom(
                        400,
                        "Quantity exceeds available stock");
            }

            OrderItemEntity orderItem = OrderItemEntity.builder()
                    .uuid(orderItemId)
                    .ticketUuid(item.getTicketUuid())
                    .quantity(item.getQuantity())
                    .orderUuid(orderId)
                    .createdAt(createdAt)
                    .creatorId(createReq.getUserId())
                    .modifiedAt(modifiedAt)
                    .modifierId(createReq.getUserId())
                    .deletedAt(deletedAt)
                    .deletorId(deletorId)
                    .build();

            System.err.println("[createOrderV1] built orderItem: " + orderItem);
            orderItems.add(orderItem);
        }

        OrderEntity orderEntity = OrderEntity.builder()
                .id(orderId)
                .status(OrderStatusEnum.PENDING)
                .userId(createReq.getUserId())
                .creatorId(createReq.getUserId())
                .modifierId(createReq.getUserId())
                .deletorId(deletorId)
                .createdAt(createdAt)
                .modifiedAt(modifiedAt)
                .deletedAt(deletedAt)
                .build();

        try {
            OrderEntity createdOrder = this.orderRepo.create(orderEntity);
            if (createdOrder.getId() == null || createdOrder.getId().isBlank()) {
                throw new RuntimeException("Create order failed");
            }
            this.orderItemRepo.saveAll(orderItems);
            this.productClient.reduceStock(orderEntity.getId(), orderItems);
            return new CreateOrderResDTO(createdOrder.getId(), "not today");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public CreateOrderResDTO createOrderWithCahingAndKafkaAsynchronous(CreateOrderReqDTO createReq) {
        List<String> listTicketID = new ArrayList<String>();
        createReq.getOrderItems().forEach(item -> listTicketID.add(item.getTicketUuid()));

        List<TicketData> listTicket = new ArrayList<TicketData>();

        List<TicketData> cached = this.ticketCacheService.getTicketsByIds(listTicketID);
        boolean cacheHitAll = cached != null
                && cached.stream().map(TicketData::getId).collect(Collectors.toSet())
                        .containsAll(listTicketID);

        if (cacheHitAll) {
            listTicket = cached;
        } else {
            TicketResponseData<List<TicketData>> tickets = productClient.getTicketsByIds(listTicketID);
            if (tickets.getData() == null || tickets.getData().isEmpty()) {
                throw new ErrorCustom(400, "Error not found product: " + String.join(",", listTicketID));
            }
            listTicket = tickets.getData();
            // save cache
            this.ticketCacheService.saveTickets(listTicket);
        }

        // 2. build order items
        String orderId = UUID.randomUUID().toString();
        int createdAt = (int) (System.currentTimeMillis() / 1000L);
        int modifiedAt = (int) (System.currentTimeMillis() / 1000L);
        int deletedAt = 0;
        String deletorId = "";
        Map<String, TicketData> ticketMap = listTicket.stream()
                .collect(Collectors.toMap(
                        TicketData::getId,
                        Function.identity()));
        List<OrderItemEntity> orderItems = new ArrayList<>();

        for (var item : createReq.getOrderItems()) {
            String orderItemId = UUID.randomUUID().toString();
            TicketData ticket = ticketMap.get(item.getTicketUuid());

            if (ticket == null) {
                throw new ErrorCustom(
                        404,
                        "Ticket not found: " + item.getTicketUuid());
            }

            if (item.getQuantity() > ticket.getTotalQuantity()) {
                throw new ErrorCustom(
                        400,
                        "Quantity exceeds available stock");
            }

            OrderItemEntity orderItem = OrderItemEntity.builder()
                    .uuid(orderItemId)
                    .ticketUuid(item.getTicketUuid())
                    .quantity(item.getQuantity())
                    .orderUuid(orderId)
                    .createdAt(createdAt)
                    .creatorId(createReq.getUserId())
                    .modifiedAt(modifiedAt)
                    .modifierId(createReq.getUserId())
                    .deletedAt(deletedAt)
                    .deletorId(deletorId)
                    .build();

            System.err.println("[createOrderV1] built orderItem: " + orderItem);
            orderItems.add(orderItem);
        }

        OrderEntity orderEntity = OrderEntity.builder()
                .id(orderId)
                .status(OrderStatusEnum.PENDING)
                .userId(createReq.getUserId())
                .creatorId(createReq.getUserId())
                .modifierId(createReq.getUserId())
                .deletorId(deletorId)
                .createdAt(createdAt)
                .modifiedAt(modifiedAt)
                .deletedAt(deletedAt)
                .build();

        try {
            OrderEntity createdOrder = this.orderRepo.create(orderEntity);
            if (createdOrder.getId() == null || createdOrder.getId().isBlank()) {
                throw new RuntimeException("Create order failed");
            }

            this.orderItemRepo.saveAll(orderItems);

            this.kafkaProducerService.sendMessage("order.created", new ProduceCreatedOrderMessage(
                    createReq.getUserId(),
                    createdOrder.getId(),
                    createReq.getOrderItems().stream().map(i -> new Items(i.getTicketUuid(),
                            i.getQuantity())).toList()));
            return new CreateOrderResDTO(createdOrder.getId(), "not today");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

}
