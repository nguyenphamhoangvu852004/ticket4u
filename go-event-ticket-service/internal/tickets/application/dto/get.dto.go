package dto

type (
	GetTicketByIDReq struct {
		ID string
	}
	GetTicketByIDRes struct {
		ID            string  `json:"id,omitempty" `
		Title         string  `json:"title,omitempty" `
		Price         float64 `json:"price,omitempty" `
		Status        string  `json:"status,omitempty" `
		TotalQuantity uint64  `json:"totalQuantity" `
		SoldQuantity  uint64  `json:"soldQuantity" `
		EventTimeID   string  `json:"eventTimeId,omitempty" `
		Created_at    string  `json:"createdAt,omitempty" `
		Updated_at    string  `json:"updatedAt,omitempty" `
	}
)
type (
	GetTicketsListReq struct {
		Page string `json:"page"`
	}
	GetTicketsListRes struct {
		Tickets []GetTicketByIDRes `json:"tickets"`
	}
)

type (
	GetTicketsByEventTimeIdReq struct {
		EventTimeID string
	}

	GetTicketsByEventTimeIdRes struct {
		EventTimeID string             `json:"eventTimeId,omitempty" `
		Tickets     []GetTicketByIDRes `json:"tickets,omitempty" `
	}
)
