package service

import (
	"context"
	"go-event-ticket-service/internal/eventTimes/application/dto"
)

type EventTimeService interface {
	CreateEventTime(ctx context.Context, reqData *dto.CreateEventTimeReq) (resData *dto.CreateEventTimeRes, err error)
	GetEventTimes(ctx context.Context, reqData *dto.GetEventTimesReq) (resData *dto.GetEventTimesRes, err error)
	GetEventTimeById(ctx context.Context, reqData *dto.GetEventTimeByIdReq) (resData *dto.GetEventTimeByIdRes, err error)
	SoftDeleteEventTime(ctx context.Context, reqData *dto.SoftDeleteEventTimeReq) (resData *dto.SoftDeleteEventTimeRes, err error)
	UpdateEventTime(ctx context.Context, reqData *dto.UpdateEventTimeReq) (resData *dto.UpdateEventTimeReq, err error)

	GetEventTimesByEventId(ctx context.Context, reqData *dto.GetEventTimeByEventIdReq) (resData *dto.GetEventTimeByEventIdRes, err error)
}
