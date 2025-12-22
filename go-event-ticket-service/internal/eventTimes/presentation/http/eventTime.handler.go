package http

import (
	"go-event-ticket-service/internal/eventTimes/application/dto"
	"go-event-ticket-service/internal/eventTimes/application/service"
	"log"

	"github.com/gin-gonic/gin"
)

type EventTimeHandler struct {
	service service.EventTimeService
}

func (e *EventTimeHandler) SoftDeleteEventTimeHandler(ctx *gin.Context) (res interface{}, err error) {
	var reqData dto.SoftDeleteEventTimeReq
	if err := ctx.ShouldBindJSON(&reqData); err != nil {
		return nil, err
	}
	reqData.EventTimeId = ctx.Param("eventTimeId")
	rs, err := e.service.SoftDeleteEventTime(ctx, &reqData)
	if err != nil {
		log.Printf("delete event %s failed: %v", ctx.Param("eventId"), err)
		return nil, err
	}
	return rs, nil
}
func (e *EventTimeHandler) GetEventTimeByIDHandler(ctx *gin.Context) (res interface{}, err error) {
	return e.service.GetEventTimeById(ctx, &dto.GetEventTimeByIdReq{ID: ctx.Param("eventTimeId")})
}

func (e *EventTimeHandler) CreateEventTimeHandler(ctx *gin.Context) (res interface{}, err error) {
	eventId := ctx.Param("eventId")
	var reqData dto.CreateEventTimeReq
	if err := ctx.ShouldBindJSON(&reqData); err != nil {
		return nil, err
	}
	reqData.EventId = eventId

	rs, err := e.service.CreateEventTime(ctx, &reqData)

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func NewEventTimeHandler(s *service.EventTimeService) *EventTimeHandler {
	return &EventTimeHandler{
		service: *s,
	}
}
