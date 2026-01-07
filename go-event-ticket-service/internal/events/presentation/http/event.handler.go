package http

import (
	"go-event-ticket-service/internal/events/application/dto"
	"go-event-ticket-service/internal/events/application/service"

	"github.com/gin-gonic/gin"
)

type EventHandler struct {
	service service.EventService
}

func (h *EventHandler) GetEventTimesHandler(ctx *gin.Context) (res interface{}, err error) {
	return h.service.GetEventsList(ctx, &dto.GetEventsListReq{Page: ctx.Query("page")})
}

func (h *EventHandler) RestoreEventHandler(ctx *gin.Context) (res interface{}, err error) {
	return nil, h.service.RestoreEvent(ctx, &dto.RestoreEventReq{ID: ctx.Param("id")})
}

func (h *EventHandler) GetDeletedEventsHandler(ctx *gin.Context) (res interface{}, err error) {
	return h.service.GetDeletedList(ctx, &dto.GetDeletedListReq{Page: ctx.Query("page")})
}

func (h *EventHandler) DeleteEventHandler(ctx *gin.Context) (res interface{}, err error) {
	return nil, h.service.DeleteEvent(ctx, &dto.DeleteEventReq{ID: ctx.Param("id")})

}
func (h *EventHandler) ModifyEventHandler(ctx *gin.Context) (res interface{}, err error) {
	id := ctx.Param("id")
	var req dto.ModifyEventReq

	if err := ctx.ShouldBind(&req); err != nil {
		return nil, err
	}
	req.ID = id

	return h.service.ModifyEvent(ctx, &req)
}

func (h *EventHandler) CreateEventHandler(ctx *gin.Context) (res interface{}, err error) {
	var req dto.CreateEventReq
	if err := ctx.ShouldBindJSON(&req); err != nil {
		return nil, err
	}

	return h.service.CreateEvent(ctx, &req)
}

func (h *EventHandler) GetEventHandler(ctx *gin.Context) (res interface{}, err error) {
	req := dto.GetEventByIDReq{
		ID: ctx.Param("id"),
	}

	event, err := h.service.GetEventById(ctx.Request.Context(), &req)

	if err != nil {
		return nil, err
	}

	return event, nil
}

// Get available events documentation
// @Summary      Get list events
// @Description  Get list events with pagination
// @Tags         Events
// @Accept       json
// @Produce      json
// @Param        page query string false "Page number" default(1)
// @Success      200  {object}  response.APIResponse
// @Failure      500  {object}  response.APIResponse
// @Router       /events [get]
func (h *EventHandler) GetListEventHandler(ctx *gin.Context) (res interface{}, err error) {
	page := ctx.DefaultQuery("page", "1")
	rs, err := h.service.GetEventsList(ctx, &dto.GetEventsListReq{Page: page})
	if err != nil {
		return nil, err
	}
	return rs, err
}

func NewEventHandler(s *service.EventService) *EventHandler {
	return &EventHandler{
		service: *s,
	}
}
