package dto

type CheckTransactionRequestDTO struct {
	OrderID   string `json:"orderId" binding:"required"`
	RequestID string `json:"requestId" binding:"required"`
}
