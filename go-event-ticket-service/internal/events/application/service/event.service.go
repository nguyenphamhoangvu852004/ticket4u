package service

import (
	"context"
	"go-event-ticket-service/internal/events/application/dto"
)

type EventService interface {
	GetEventsList(ctx context.Context, reqData *dto.GetEventsListReq) (resData *dto.GetEventsListRes, err error)
	GetEventById(ctx context.Context, reqData *dto.GetEventByIDReq) (resData *dto.GetEventByIDRes, err error)
	CreateEvent(ctx context.Context, reqData *dto.CreateEventReq) (resData *dto.CreateEventRes, err error)
	ModifyEvent(ctx context.Context, reqData *dto.ModifyEventReq) (resData *dto.ModifyEventRes, err error)
	DeleteEvent(ctx context.Context, reqData *dto.DeleteEventReq) error
	GetDeletedList(ctx context.Context, reqData *dto.GetDeletedListReq) (resData *dto.GetDeletedListRes, err error)
	RestoreEvent(ctx context.Context, reqData *dto.RestoreEventReq) error
}
