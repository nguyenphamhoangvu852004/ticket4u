package dto

type (
	CreateEventTimeReq struct {
		EventId     string
		StartTime   string `json:"startTime"`
		EndTime     string `json:"endTime"`
		Description string `json:"description"`
		CreatorId   string `json:"creatorId"`
	}

	CreateEventTimeRes struct {
		ID        string `json:"id"`
		CreatedAt string `json:"createdAt"`
	}
)
