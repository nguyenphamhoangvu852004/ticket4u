package mapper

import (
	"encoding/json"
	"go-event-ticket-service/internal/search/application/dto"
	"go-event-ticket-service/internal/search/domain/entity"
	"io"
	"strings"
)

func ToEventSearchCriteria(req dto.SearchEventRequest) (*entity.EventSearchCriteria, error) {
	criteria := &entity.EventSearchCriteria{
		Keyword: strings.TrimSpace(req.Keyword),
		Pagination: entity.Pagination{
			Page:  req.Page,
			Limit: req.Limit,
		},
	}

	// ===== Filters =====

	// Category
	if len(req.Filters.CategoryIDs) > 0 {
		criteria.CategoryIDs = req.Filters.CategoryIDs
	}

	// // Location
	// if len(req.Filters.LocationIDs) > 0 {
	// 	criteria.LocationIDs = req.Filters.LocationIDs
	// }

	// // Price range
	// if req.Filters.MinPrice != nil || req.Filters.MaxPrice != nil {
	// 	criteria.PriceRange = &entity.PriceRange{
	// 		Min: req.Filters.MinPrice,
	// 		Max: req.Filters.MaxPrice,
	// 	}
	// }

	// // Time range (unix timestamp)
	// if req.Filters.StartTimeFrom != nil || req.Filters.StartTimeTo != nil {
	// 	var from, to *time.Time

	// 	if req.Filters.StartTimeFrom != nil {
	// 		t := time.Unix(*req.Filters.StartTimeFrom, 0)
	// 		from = &t
	// 	}

	// 	if req.Filters.StartTimeTo != nil {
	// 		t := time.Unix(*req.Filters.StartTimeTo, 0)
	// 		to = &t
	// 	}

	// 	criteria.TimeRange = &entity.TimeRange{
	// 		From: from,
	// 		To:   to,
	// 	}
	// }

	// Has ticket
	// criteria.HasAvailableTicket = req.Filters.HasAvailableTicket

	// ===== Sort =====
	if req.Sort.Field != "" {
		criteria.Sort = entity.SortOption{
			Field: parseSortField(req.Sort.Field),
			Order: parseSortOrder(req.Sort.Order),
		}
	} else {
		criteria.Sort = entity.SortOption{
			Field: entity.SortByRelevance,
			Order: entity.SortDesc,
		}
	}

	return criteria, nil
}

func parseSortField(field string) entity.SortField {
	switch field {
	case "start_time":
		return entity.SortByStartTime
	case "price":
		return entity.SortByPrice
	default:
		return entity.SortByRelevance
	}
}

func parseSortOrder(order string) entity.SortOrder {
	if order == "asc" {
		return entity.SortAsc
	}
	return entity.SortDesc
}
func MapESResponse(body io.Reader) (*entity.EventSearchResult, error) {
	rawBytes, err := io.ReadAll(body)
	if err != nil {
		return nil, err
	}

	if len(rawBytes) == 0 {
		return &entity.EventSearchResult{
			Total: 0,
			Items: []entity.EventSearchItem{},
		}, nil
	}

	// debug khi cần
	// fmt.Println("ES RAW RESPONSE:", string(rawBytes))

	var raw struct {
		Hits struct {
			Total interface{} `json:"total"`
			Hits  []struct {
				Source struct {
					ID       string `json:"id"`
					Title    string `json:"title"`
					Address  string `json:"address"`
					Category struct {
						ID    string `json:"id"`
						Title string `json:"title"`
					} `json:"category"`
				} `json:"_source"`
			} `json:"hits"`
		} `json:"hits"`
	}

	if err := json.Unmarshal(rawBytes, &raw); err != nil {
		return nil, err
	}

	// parse total (ES có 2 format)
	var total int64
	switch t := raw.Hits.Total.(type) {
	case map[string]interface{}:
		if v, ok := t["value"].(float64); ok {
			total = int64(v)
		}
	case float64:
		total = int64(t)
	}

	result := &entity.EventSearchResult{
		Total: total,
	}

	for _, h := range raw.Hits.Hits {
		result.Items = append(result.Items, entity.EventSearchItem{
			ID:            h.Source.ID,
			Title:         h.Source.Title,
			Address:       h.Source.Address,
			CategoryID:    h.Source.Category.ID,
			CategoryTitle: h.Source.Category.Title,
		})
	}

	return result, nil
}
