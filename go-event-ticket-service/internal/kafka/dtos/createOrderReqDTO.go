package dtos

type CreateOrderReqDTO struct {
	UserId  string `json:"userId"`
	OrderId string `json:"orderId"`
	Items   []struct {
		ID       string `json:"id"`
		Quantity int    `json:"quantity"`
	} `json:"items"`
}
