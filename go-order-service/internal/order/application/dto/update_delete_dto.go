package dto

type UpdateStatusOrderReqDTO struct {
	OrderId string `json:"orderId" validate:"required"`
	Status  string `json:"status" validate:"required"`
	UserId  string `json:"userId"`
}

type UpdateStatusOrderResDTO struct {
	OrderId    string `json:"orderId"`
	Status     string `json:"status"`
	ModifiedAt string `json:"modifiedAt"`
}

type SoftDeleteOrderReqDTO struct {
	UserId string `json:"userId"`
}

type SoftDeleteOrderResDTO struct {
	OrderId   string `json:"orderId"`
	DeletedAt string `json:"deletedAt"`
}
