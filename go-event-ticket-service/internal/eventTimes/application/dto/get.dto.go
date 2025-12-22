package dto

type (
	GetEventTimesReq struct {
	}
	GetEventTimesRes struct {
	}
)

type (
	GetEventTimeByIdReq struct {
		ID string `json:"id"`
	}

	GetEventTimeByIdRes struct {
		ID        string `json:"id"`
		EventId   string `json:"eventId"`
		StartTime string `json:"startTime"`
		EndTime   string `json:"endTime"`
		CreatedAt string `json:"createdAt"`
	}
)

type (
	GetEventTimeByEventIdReq struct {
	}

	GetEventTimeByEventIdRes struct {
	}
)
