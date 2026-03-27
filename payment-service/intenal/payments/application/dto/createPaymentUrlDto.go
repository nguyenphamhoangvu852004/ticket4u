package dto

type (
	CreatePaymentURLRequestDTO struct {
		OrderID string `json:"orderId"`
		Amount  string `json:"amount"`
	}

	CreatePaymentURLRespondDTO struct {
		Url string `json:"url"`
	}
)
