package dto

type (
	CreateEventReq struct {
		Title       string `json:"title"`
		Address     string `json:"address"`
		OrganizerId string `json:"organizerId"`
		CategoryId  string `json:"categoryId"`
		EventTimes  []struct {
			StartTime   string `json:"startTime"`
			EndTime     string `json:"endTime"`
			Description string `json:"description"`
			Tickets     []struct {
				Title    string `json:"title"`
				Price    string `json:"price"`
				Status   string `json:"status"`
				Quantity string `json:"quantity"`
			} `json:"tickets"`
		} `json:"eventTimes"`
	}

	CreateEventRes struct {
		ID string `json:"id"`
	}
)
