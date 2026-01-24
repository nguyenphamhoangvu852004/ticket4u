package service

import (
	"context"
	"go-event-ticket-service/internal/search/application/dto"
)

type SearchService interface {
	// GetEventsList(ctx context.Context, reqData *dto.GetEventsListReq) (resData *dto.GetEventsListRes, err error)
	ExecuteSearch(ctx context.Context, reqData *dto.SearchEventRequest) (resData interface{}, err error)
}
