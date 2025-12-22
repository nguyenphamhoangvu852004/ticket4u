package utils

import (
	"go-event-ticket-service/internal/common"
	"math"
)

func NewPaginationMeta(totalItems, page, perPage int) common.PaginationRes {
	if perPage <= 0 {
		perPage = 10 // default
	}
	totalPage := int(math.Ceil(float64(totalItems) / float64(perPage)))

	if page < 1 {
		page = 1
	}
	if totalPage > 0 && page > totalPage {
		page = totalPage
	}

	return common.PaginationRes{
		CurrentPage: page,
		PerPage:     perPage,
		TotalItems:  totalItems,
		TotalPages:  totalPage,
	}
}
