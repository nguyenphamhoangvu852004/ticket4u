package repository

import (
	"context"
	"go-order-service/global"
	"go-order-service/internal/order/domain/entity"
)

type IOrderRepository interface {
	Create(ctx context.Context, order *entity.Order) error
	GetOne(ctx context.Context, id string) (*entity.Order, error)
	GetMany(ctx context.Context, page, size int) ([]entity.Order, error)
	GetManyByUser(ctx context.Context, userID string, page, size int) ([]entity.Order, error)
	GetCount(ctx context.Context) (int64, error)
	Update(ctx context.Context, order *entity.Order) error
}

type orderRepository struct{}

func NewOrderRepository() IOrderRepository {
	return &orderRepository{}
}

func (r *orderRepository) Create(ctx context.Context, order *entity.Order) error {
	return global.DB.WithContext(ctx).Create(order).Error
}

func (r *orderRepository) GetOne(ctx context.Context, id string) (*entity.Order, error) {
	var order entity.Order
	err := global.DB.WithContext(ctx).First(&order, "id = ? AND deleted_at = 0", id).Error
	return &order, err
}

func (r *orderRepository) GetMany(ctx context.Context, page, size int) ([]entity.Order, error) {
	var orders []entity.Order
	offset := (page - 1) * size
	err := global.DB.WithContext(ctx).Where("deleted_at = 0").Offset(offset).Limit(size).Find(&orders).Error
	return orders, err
}

func (r *orderRepository) GetManyByUser(ctx context.Context, userID string, page, size int) ([]entity.Order, error) {
	var orders []entity.Order
	offset := (page - 1) * size
	err := global.DB.WithContext(ctx).Where("user_id = ? AND deleted_at = 0", userID).Offset(offset).Limit(size).Find(&orders).Error
	return orders, err
}

func (r *orderRepository) GetCount(ctx context.Context) (int64, error) {
	var count int64
	err := global.DB.Model(&entity.Order{}).Where("deleted_at = 0").Count(&count).Error
	return count, err
}

func (r *orderRepository) Update(ctx context.Context, order *entity.Order) error {
	return global.DB.WithContext(ctx).Save(order).Error
}
