package service

import (
	"context"
	"go-event-ticket-service/internal/categories/application/dto"
)

type CategoryService interface {
	GetListCategoryHandler(ctx context.Context, req *dto.GetCategoriesListReq) (res *dto.GetCategoriesListRes, err error)
}
