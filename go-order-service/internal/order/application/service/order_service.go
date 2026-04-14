package service

import (
	"context"
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"go-order-service/global"
	"go-order-service/internal/order/application/dto"
	"go-order-service/internal/order/domain/entity"
	"go-order-service/internal/order/infrastructure/api"
	"go-order-service/internal/order/infrastructure/repository"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/segmentio/kafka-go"
	"gorm.io/gorm"
)

type IOrderService interface {
	CreateOrder(ctx context.Context, req *dto.CreateOrderReqDTO) (*dto.CreateOrderResDTO, error)
	GetListOrder(ctx context.Context, req *dto.GetListOrderReqDto) (*dto.GetListOrderResDto, error)
	GetOrderByID(ctx context.Context, req *dto.GetOrderByIDReqDto) (*dto.GetOrderByIDResDto, error)
	UpdateStatusOrder(ctx context.Context, req *dto.UpdateStatusOrderReqDTO) (*dto.UpdateStatusOrderResDTO, error)
	SoftDeleteOrder(ctx context.Context, req *dto.SoftDeleteOrderReqDTO, orderID string) (*dto.SoftDeleteOrderResDTO, error)
	GetListOrderByUser(ctx context.Context, req *dto.GetListOrderByUserReqDto) (*dto.GetListOrderResDto, error)
}

type orderService struct {
	orderRepo     repository.IOrderRepository
	orderItemRepo repository.IOrderItemRepository
	productClient api.IProductClient
}

func NewOrderService(
	orderRepo repository.IOrderRepository,
	orderItemRepo repository.IOrderItemRepository,
	productClient api.IProductClient,
) IOrderService {
	return &orderService{
		orderRepo:     orderRepo,
		orderItemRepo: orderItemRepo,
		productClient: productClient,
	}
}

const stockLuaScript = `
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
`

func (s *orderService) CreateOrder(ctx context.Context, req *dto.CreateOrderReqDTO) (*dto.CreateOrderResDTO, error) {
	// =========================
	// 0. IDEMPOTENCY
	// =========================
	itemsCopy := make([]dto.OrderReqDTO, len(req.OrderItems))
	copy(itemsCopy, req.OrderItems)
	sort.Slice(itemsCopy, func(i, j int) bool {
		return itemsCopy[i].TicketUuid < itemsCopy[j].TicketUuid
	})

	var rawParts []string
	for _, item := range itemsCopy {
		rawParts = append(rawParts, fmt.Sprintf("%s-%d", item.TicketUuid, item.Quantity))
	}
	rawKey := fmt.Sprintf("%s:%s", req.UserId, strings.Join(rawParts, "|"))
	hash := md5.Sum([]byte(rawKey))
	idemKey := "order:lock:" + hex.EncodeToString(hash[:])

	isFirst, err := global.RDB.SetNX(ctx, idemKey, "1", 5*time.Second).Result()
	if err != nil || !isFirst {
		return nil, errors.New("duplicate request")
	}

	// =========================
	// 1. PREPARE DATA
	// =========================
	productIDs := make([]string, len(req.OrderItems))
	for i, item := range req.OrderItems {
		productIDs[i] = item.TicketUuid
	}

	tickets, err := s.productClient.GetTicketsByIDs(ctx, productIDs)
	if err != nil {
		return nil, err
	}

	ticketMap := make(map[string]interface{}) // Placeholder to use for stock checks
	for _, t := range tickets {
		ticketMap[t.ID] = t
	}

	// =========================
	// 3. PROCESS ITEMS & ATOMIC STOCK
	// =========================
	now := time.Now().Unix()
	var orderItems []entity.OrderItem
	var processedItems []dto.OrderReqDTO

	for _, item := range req.OrderItems {
		ticket, ok := ticketMap[item.TicketUuid].(interface{}) // Simple type check for now
		if !ok {
			// Rollback Redis if needed, but we haven't deducted anything yet
			return nil, errors.New("product not found")
		}

		// Re-marshal to get ticket data (since map uses interface{})
		ticketDataBytes, _ := json.Marshal(ticket)
		var td struct {
			ID            string `json:"id"`
			Price         int    `json:"price"`
			TotalQuantity int    `json:"totalQuantity"`
		}
		json.Unmarshal(ticketDataBytes, &td)

		redisKey := "stock:product:" + item.TicketUuid
		result, err := global.RDB.Eval(ctx, stockLuaScript, []string{redisKey}, item.Quantity, td.TotalQuantity).Result()
		if err != nil {
			s.rollbackRedis(ctx, processedItems)
			return nil, err
		}

		remain := result.(int64)
		if remain < 0 {
			s.rollbackRedis(ctx, processedItems)
			return nil, fmt.Errorf("out of stock: %s", item.TicketUuid)
		}

		processedItems = append(processedItems, item)
		orderItems = append(orderItems, entity.OrderItem{
			UUID:       uuid.New().String(),
			TicketUUID: item.TicketUuid,
			Quantity:   item.Quantity,
			BaseEntity: entity.BaseEntity{
				CreatorID:  req.UserId,
				ModifierID: req.UserId,
				CreatedAt:  now,
				ModifiedAt: now,
			},
		})
	}

	// =========================
	// 4. CREATE ORDER
	// =========================
	order := &entity.Order{
		ID:     uuid.New().String(),
		Status: entity.StatusPending,
		UserID: req.UserId,
		BaseEntity: entity.BaseEntity{
			CreatorID:  req.UserId,
			ModifierID: req.UserId,
			CreatedAt:  now,
			ModifiedAt: now,
		},
	}

	err = global.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(order).Error; err != nil {
			return err
		}

		for i := range orderItems {
			orderItems[i].OrderUUID = order.ID
			if err := tx.Create(&orderItems[i]).Error; err != nil {
				return err
			}
		}
		return nil
	})

	if err != nil {
		s.rollbackRedis(ctx, processedItems)
		return nil, err
	}

	// =========================
	// 6. SEND KAFKA EVENT
	// =========================
	msg := map[string]interface{}{
		"userId":  req.UserId,
		"orderId": order.ID,
		"items":   processedItems,
	}
	msgBytes, _ := json.Marshal(msg)
	global.KafkaProducer.WriteMessages(ctx, kafka.Message{
		Value: msgBytes,
	})

	return &dto.CreateOrderResDTO{
		OrderId: order.ID,
		Status:  "SUCCESS",
	}, nil
}

func (s *orderService) rollbackRedis(ctx context.Context, items []dto.OrderReqDTO) {
	for _, item := range items {
		global.RDB.IncrBy(ctx, "stock:product:"+item.TicketUuid, int64(item.Quantity))
	}
}

func (s *orderService) GetListOrder(ctx context.Context, req *dto.GetListOrderReqDto) (*dto.GetListOrderResDto, error) {
	page, _ := strconv.Atoi(req.Page)
	size, _ := strconv.Atoi(req.Size)
	if page <= 0 {
		page = 1
	}
	if size <= 0 {
		size = 10
	}

	orders, err := s.orderRepo.GetMany(ctx, page, size)
	if err != nil {
		return nil, err
	}

	var resItems []dto.OrderResDto
	for _, o := range orders {
		totalPrice := s.calculateTotalPrice(ctx, o.ID)
		resItems = append(resItems, dto.OrderResDto{
			OrderID:    o.ID,
			UserID:     o.UserID,
			Status:     string(o.Status),
			TotalPrice: fmt.Sprintf("%.2f", totalPrice),
			CreatedAt:  time.Unix(o.CreatedAt, 0).Format("2006-01-02 15:04:05"),
			ModifiedAt: time.Unix(o.ModifiedAt, 0).Format("2006-01-02 15:04:05"),
		})
	}

	totalItems, _ := s.orderRepo.GetCount(ctx)
	totalPage := int(totalItems) / size
	if int(totalItems)%size != 0 {
		totalPage++
	}

	return &dto.GetListOrderResDto{
		ListOrder: resItems,
		Pagination: dto.PaginationResponse{
			Page:      page,
			Size:      size,
			TotalPage: totalPage,
			TotalItem: totalItems,
		},
	}, nil
}

func (s *orderService) GetOrderByID(ctx context.Context, req *dto.GetOrderByIDReqDto) (*dto.GetOrderByIDResDto, error) {
	order, err := s.orderRepo.GetOne(ctx, req.OrderID)
	if err != nil {
		return nil, err
	}

	items, err := s.orderItemRepo.GetManyByOrderID(ctx, order.ID)
	if err != nil {
		return nil, err
	}

	var resItems []dto.OrderItemResDto
	var totalPrice float64
	for _, item := range items {
		ticket, err := s.productClient.GetTicketByID(ctx, item.TicketUUID)
		if err != nil {
			continue
		}
		itemTotal := float64(ticket.Price * item.Quantity)
		totalPrice += itemTotal
		resItems = append(resItems, dto.OrderItemResDto{
			ID:         item.TicketUUID,
			Quantity:   item.Quantity,
			TotalPrice: fmt.Sprintf("%.2f", itemTotal),
			CreatedAt:  time.Unix(item.CreatedAt, 0).Format("2006-01-02 15:04:05"),
			ModifiedAt: time.Unix(item.ModifiedAt, 0).Format("2006-01-02 15:04:05"),
		})
	}

	return &dto.GetOrderByIDResDto{
		OrderID:    order.ID,
		UserID:     order.UserID,
		CreatedAt:  time.Unix(order.CreatedAt, 0).Format("2006-01-02 15:04:05"),
		ModifiedAt: time.Unix(order.ModifiedAt, 0).Format("2006-01-02 15:04:05"),
		TotalPrice: fmt.Sprintf("%.2f", totalPrice),
		Status:     string(order.Status),
		OrderItems: resItems,
	}, nil
}

func (s *orderService) UpdateStatusOrder(ctx context.Context, req *dto.UpdateStatusOrderReqDTO) (*dto.UpdateStatusOrderResDTO, error) {
	order, err := s.orderRepo.GetOne(ctx, req.OrderId)
	if err != nil {
		return nil, err
	}

	if order.Status == entity.StatusCompleted {
		return nil, errors.New("order is already completed")
	}

	order.Status = entity.OrderStatus(req.Status)
	order.ModifiedAt = time.Now().Unix()
	order.ModifierID = req.UserId

	if err := s.orderRepo.Update(ctx, order); err != nil {
		return nil, err
	}

	return &dto.UpdateStatusOrderResDTO{
		OrderId:    order.ID,
		Status:     string(order.Status),
		ModifiedAt: time.Unix(order.ModifiedAt, 0).Format("2006-01-02 15:04:05"),
	}, nil
}

func (s *orderService) SoftDeleteOrder(ctx context.Context, req *dto.SoftDeleteOrderReqDTO, orderID string) (*dto.SoftDeleteOrderResDTO, error) {
	order, err := s.orderRepo.GetOne(ctx, orderID)
	if err != nil {
		return nil, err
	}

	order.DeletedAt = time.Now().Unix()
	order.DeletorID = req.UserId

	if err := s.orderRepo.Update(ctx, order); err != nil {
		return nil, err
	}

	return &dto.SoftDeleteOrderResDTO{
		OrderId:   order.ID,
		DeletedAt: time.Unix(order.DeletedAt, 0).Format("2006-01-02 15:04:05"),
	}, nil
}

func (s *orderService) GetListOrderByUser(ctx context.Context, req *dto.GetListOrderByUserReqDto) (*dto.GetListOrderResDto, error) {
	page, _ := strconv.Atoi(req.Page)
	size, _ := strconv.Atoi(req.Size)
	if page <= 0 {
		page = 1
	}
	if size <= 0 {
		size = 10
	}

	orders, err := s.orderRepo.GetManyByUser(ctx, req.UserId, page, size)
	if err != nil {
		return nil, err
	}

	var resItems []dto.OrderResDto
	for _, o := range orders {
		totalPrice := s.calculateTotalPrice(ctx, o.ID)
		resItems = append(resItems, dto.OrderResDto{
			OrderID:    o.ID,
			UserID:     o.UserID,
			Status:     string(o.Status),
			TotalPrice: fmt.Sprintf("%.2f", totalPrice),
			CreatedAt:  time.Unix(o.CreatedAt, 0).Format("2006-01-02 15:04:05"),
			ModifiedAt: time.Unix(o.ModifiedAt, 0).Format("2006-01-02 15:04:05"),
		})
	}

	totalItems, _ := s.orderRepo.GetCount(ctx) // This should ideally be count by user
	totalPage := int(totalItems) / size
	if int(totalItems)%size != 0 {
		totalPage++
	}

	return &dto.GetListOrderResDto{
		ListOrder: resItems,
		Pagination: dto.PaginationResponse{
			Page:      page,
			Size:      size,
			TotalPage: totalPage,
			TotalItem: totalItems,
		},
	}, nil
}

func (s *orderService) calculateTotalPrice(ctx context.Context, orderID string) float64 {
	items, err := s.orderItemRepo.GetManyByOrderID(ctx, orderID)
	if err != nil {
		return 0
	}

	var total float64
	for _, item := range items {
		ticket, err := s.productClient.GetTicketByID(ctx, item.TicketUUID)
		if err == nil {
			total += float64(ticket.Price * item.Quantity)
		}
	}
	return total
}
