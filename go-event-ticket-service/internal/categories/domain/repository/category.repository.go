package repository

import (
	"context"
	"go-event-ticket-service/internal/categories/domain/entity"
)

type CategoryRepository interface {
	GetList(ctx context.Context) ([]entity.CategoryEntity, error)
}
