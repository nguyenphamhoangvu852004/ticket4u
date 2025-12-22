package repository

import (
	"context"
	"go-event-ticket-service/internal/tickets/domain/repository/api"
)

type OrderRepository struct {
}

// GetOrderByOrderId implements api.OrderRepository.
func (o *OrderRepository) GetOrderByOrderId(ctx context.Context, orderId string) error {
	panic("unimplemented")
}

func NewOrderRepository() api.OrderRepository {
	return &OrderRepository{}
}
