package dto

type (
	DeleteTicketReq struct {
		ID        string `binding:"required"`
		DeletorID string `json:"deletorId" binding:"required"`
	}

	DeleteTicketRes struct {
		ID        string `json:"id,omitempty" `
		DeletedAt string `json:"deletedAt,omitempty" `
	}
)
