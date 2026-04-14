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

// @Summary Soft delete event time
// @Description Soft delete an event time and its associated tickets
// @Tags EventTimes
// @Accept json
// @Produce json
// @Param eventTimeId path string true "Event Time ID"
// @Param req body dto.SoftDeleteEventTimeReq true "Delete request body"
// @Success 200 {object} response.APIResponse{data=dto.SoftDeleteEventTimeRes}
// @Failure 400 {object} response.APIResponse
// @Failure 500 {object} response.APIResponse
// @Router /eventTimes/{eventTimeId} [delete]
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

// @Summary Get event time by ID
// @Description Get details of an event time by its ID
// @Tags EventTimes
// @Accept json
// @Produce json
// @Param eventTimeId path string true "Event Time ID"
// @Success 200 {object} response.APIResponse{data=dto.GetEventTimeByIdRes}
// @Failure 404 {object} response.APIResponse
// @Router /eventTimes/{eventTimeId} [get]
func (e *EventTimeHandler) GetEventTimeByIDHandler(ctx *gin.Context) (res interface{}, err error) {
	return e.service.GetEventTimeById(ctx, &dto.GetEventTimeByIdReq{ID: ctx.Param("eventTimeId")})
}

// @Summary Create event time
// @Description Create a new event time for a specific event
// @Tags EventTimes
// @Accept json
// @Produce json
// @Param eventId path string true "Event ID"
// @Param req body dto.CreateEventTimeReq true "Create event time request"
// @Success 200 {object} response.APIResponse{data=dto.CreateEventTimeRes}
// @Failure 400 {object} response.APIResponse
// @Failure 500 {object} response.APIResponse
// @Router /events/{eventId}/eventTimes [post]
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
