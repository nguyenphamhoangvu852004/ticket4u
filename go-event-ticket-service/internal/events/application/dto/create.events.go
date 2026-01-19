package dto

type (
	EventTimeDTO struct {
		StartTime   string      `json:"startTime"`
		EndTime     string      `json:"endTime"`
		Description string      `json:"description"`
		Tickets     []TicketDTO `json:"tickets"`
	}
	TicketDTO struct {
		Title    string `json:"title"`
		Price    string `json:"price"`
		Status   string `json:"status"`
		Quantity string `json:"quantity"`
	}
	CreateEventReq struct {
		Title       string         `json:"title"`
		Address     string         `json:"address"`
		OrganizerId string         `json:"organizerId"`
		ImageURL    string         `json:"imageUrl"`
		CategoryId  string         `json:"categoryId"`
		EventTimes  []EventTimeDTO `json:"eventTimes"`
	}

	CreateEventRes struct {
		ID string `json:"id"`
	}
)
