package dtos

type CreateOrderReqDTO struct {
	UserId string `json:"userId"`
	Items  []struct {
		ID       string `json:"id"`
		Quantity int    `json:"quantity"`
	} `json:"items"`
}
