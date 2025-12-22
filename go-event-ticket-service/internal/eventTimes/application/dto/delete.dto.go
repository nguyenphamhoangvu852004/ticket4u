package dto

type (
	SoftDeleteEventTimeReq struct {
		EventTimeId string 
		DeletorId   string `json:"deletorId" binding:"required"`
	}
	SoftDeleteEventTimeRes struct {
		EventTimeId string `json:"eventTimeId" binding:"required"`
		DeletedAt   int64  `json:"deletedAt" binding:"required"`
	}
)

type (
	DeleteEventTimeReq struct {
	}
	DeleteEventTimeRes struct {
	}
)
