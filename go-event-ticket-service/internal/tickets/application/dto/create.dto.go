package dto

type (
	CreateTicketReq struct {
		EventTimeId string `json:"eventTimeId" binding:"required"`
		Title       string `json:"title" binding:"required"`
		Quantity    string `json:"quantity" binding:"required"`
		Price       string `json:"price" binding:"required"`
		CreatorId   string `json:"creatorId" binding:"required"`
	}
	CreateTicketRes struct {
		ID string `json:"id"`
	}
)
