package dto

type OrderReqDTO struct {
	TicketUuid string `json:"ticketUuid" validate:"required"`
	Quantity   int    `json:"quantity" validate:"required,gt=0"`
}

type CreateOrderReqDTO struct {
	UserId     string        `json:"userId"`
	OrderItems []OrderReqDTO `json:"orderItems" validate:"required,dive"`
}

type CreateOrderResDTO struct {
	OrderId string `json:"orderId"`
	Status  string `json:"status"`
}
