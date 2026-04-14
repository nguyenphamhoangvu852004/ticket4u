package repository

import (
	"context"
	"go-order-service/global"
	"go-order-service/internal/order/domain/entity"
)

type IOrderItemRepository interface {
	Create(ctx context.Context, item *entity.OrderItem) error
	GetManyByOrderID(ctx context.Context, orderID string) ([]entity.OrderItem, error)
}

type orderItemRepository struct{}

func NewOrderItemRepository() IOrderItemRepository {
	return &orderItemRepository{}
}

func (r *orderItemRepository) Create(ctx context.Context, item *entity.OrderItem) error {
	return global.DB.WithContext(ctx).Create(item).Error
}

func (r *orderItemRepository) GetManyByOrderID(ctx context.Context, orderID string) ([]entity.OrderItem, error) {
	var items []entity.OrderItem
	err := global.DB.WithContext(ctx).Where("order_uuid = ? AND deleted_at = 0", orderID).Find(&items).Error
	return items, err
}
