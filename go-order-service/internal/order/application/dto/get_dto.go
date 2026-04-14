package dto

type OrderItemResDto struct {
	ID         string `json:"id"`
	Quantity   int    `json:"quantity"`
	TotalPrice string `json:"totalPrice"`
	CreatedAt  string `json:"createdAt"`
	ModifiedAt string `json:"modifiedAt"`
}

type OrderResDto struct {
	OrderID    string `json:"orderId"`
	UserID     string `json:"userId"`
	Status     string `json:"status"`
	TotalPrice string `json:"totalPrice"`
	CreatedAt  string `json:"createdAt"`
	ModifiedAt string `json:"modifiedAt"`
}

type GetOrderByIDReqDto struct {
	OrderID string `json:"orderId" validate:"required"`
}

type GetOrderByIDResDto struct {
	OrderID    string             `json:"orderId"`
	UserID     string             `json:"userId"`
	CreatedAt  string             `json:"createdAt"`
	ModifiedAt string             `json:"modifiedAt"`
	TotalPrice string             `json:"totalPrice"`
	Status     string             `json:"status"`
	OrderItems []OrderItemResDto `json:"orderItems"`
}

type PaginationResponse struct {
	Page      int   `json:"page"`
	Size      int   `json:"size"`
	TotalPage int   `json:"totalPage"`
	TotalItem int64 `json:"totalItem"`
}

type GetListOrderResDto struct {
	ListOrder  []OrderResDto      `json:"listOrder"`
	Pagination PaginationResponse `json:"pagination"`
}

type GetListOrderReqDto struct {
	Page string `form:"page"`
	Size string `form:"size"`
}

type GetListOrderByUserReqDto struct {
	UserId string `json:"userId"`
	Page   string `form:"page"`
	Size   string `form:"size"`
}
