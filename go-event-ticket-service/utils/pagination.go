package utils

import (
	"go-event-ticket-service/internal/common"
	"math"
)

func NewPaginationMeta(totalItems, currentPage, perPage int) common.PaginationRes {
	if perPage <= 0 {
		perPage = 10 // default
	}
	totalPage := int(math.Ceil(float64(totalItems) / float64(perPage)))

	if currentPage < 1 {
		currentPage = 1
	}
	if totalPage > 0 && currentPage > totalPage {
		currentPage = totalPage
	}

	return common.PaginationRes{
		CurrentPage: currentPage,
		PerPage:     perPage,
		TotalItems:  totalItems,
		TotalPages:  totalPage,
	}
}
