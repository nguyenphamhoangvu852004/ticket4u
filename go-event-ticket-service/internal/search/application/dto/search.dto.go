package dto

type SearchEventRequest struct {
	Keyword string             `json:"keyword"` // full-text search
	Filters SearchEventFilters `json:"filters"`
	Sort    SearchSort         `json:"sort"`
	Page    int                `json:"page"`
	Limit   int                `json:"limit"`
}

type SearchEventFilters struct {
	CategoryIDs []string `json:"category_ids"`
	// StartTimeFrom      *string   `json:"start_time_from"` // unix timestamp
	// StartTimeTo        *int64   `json:"start_time_to"`
	// MinPrice           *int64   `json:"min_price"`
	// MaxPrice           *int64   `json:"max_price"`
	HasAvailableTicket *bool   `json:"has_available_ticket"`
	LocationIDs        []int64 `json:"location_ids"`
}

type SearchSort struct {
	Field string `json:"field"` // relevance | start_time | price
	Order string `json:"order"` // asc | desc
}
