package dto

type TicketData struct {
	ID            string `json:"id"`
	Title         string `json:"title"`
	Price         int    `json:"price"`
	Status        string `json:"status"`
	TotalQuantity int    `json:"totalQuantity"`
	SoldQuantity  int    `json:"soldQuantity"`
	EventTimeID   string `json:"eventTimeId"`
	CreatedAt     string `json:"createdAt"`
	UpdatedAt     string `json:"updatedAt"`
}

type TicketResponseData struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"` // Can be TicketData or []TicketData
}
