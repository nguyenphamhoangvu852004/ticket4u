package api

import "context"

type OrderRepository interface {
	GetOrderByOrderId(ctx context.Context, orderId string) error
}
