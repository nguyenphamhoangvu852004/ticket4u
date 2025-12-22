package dto

type (
	Ticket struct {
		TicketId string `json:"ticketId" binding:"required"`
		Amount   int    `json:"amount" binding:"required"`
	}
	UpdateSoldAmountReq struct {
		OrderId string   `json:"orderId" binding:"required"`
		Tickets []Ticket `json:"tickets" binding:"required"`
	}

	UpdateSoldAmountRes struct {
		Tickets []Ticket `json:"tickets"`
	}
)
