package entity

import "time"

type EventSearchCriteria struct {
	Keyword string

	CategoryIDs []string
	// LocationIDs []int64

	// TimeRange  *TimeRange
	// PriceRange *PriceRange

	// HasAvailableTicket *bool

	Sort       SortOption
	Pagination Pagination
}

type TimeRange struct {
	From *time.Time
	To   *time.Time
}

type PriceRange struct {
	Min *int64
	Max *int64
}

type SortOption struct {
	Field SortField
	Order SortOrder
}

type Pagination struct {
	Page  int
	Limit int
}
type SortField string
type SortOrder string

const (
	SortByRelevance SortField = "relevance"
	SortByStartTime SortField = "start_time"
	SortByPrice     SortField = "price"

	SortAsc  SortOrder = "asc"
	SortDesc SortOrder = "desc"
)

type EventSearchResult struct {
	Total int64
	Items []EventSearchItem
}

type EventSearchItem struct {
	ID      string
	Title   string
	Address string

	CategoryID    string
	CategoryTitle string
}

func BuildSearchQuery(criteria *EventSearchCriteria) map[string]interface{} {
	must := []interface{}{}
	filter := []interface{}{}

	if criteria.Keyword != "" {
		must = append(must, map[string]interface{}{
			"multi_match": map[string]interface{}{
				"query":  criteria.Keyword,
				"fields": []string{"title^2", "address"},
			},
		})
	}

	if len(criteria.CategoryIDs) > 0 {
		filter = append(filter, map[string]interface{}{
			"terms": map[string]interface{}{
				"category.id": criteria.CategoryIDs,
			},
		})
	}

	query := map[string]interface{}{
		"bool": map[string]interface{}{
			"must":   must,
			"filter": filter,
		},
	}

	return map[string]interface{}{
		"query": query,
		"from":  (criteria.Pagination.Page - 1) * criteria.Pagination.Limit,
		"size":  criteria.Pagination.Limit,
	}
}
