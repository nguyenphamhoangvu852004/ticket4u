package repository

import (
	"context"
	"go-event-ticket-service/internal/search/domain/entity"
)

type SearchRepository interface {
	Query(ctx context.Context, criteria *entity.EventSearchCriteria) (resData interface{}, err error)
}
