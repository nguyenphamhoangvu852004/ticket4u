package http

import (
	"encoding/json"
	"errors"
	"go-event-ticket-service/internal/events/application/dto"
	"go-event-ticket-service/internal/events/application/service"
	"go-event-ticket-service/pkg/response"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
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

// Create new event documentation
// @Summary      Create event
// @Description  Create a new event with eventTimes as JSON string
// @Tags         Events
// @Accept       multipart/form-data
// @Produce      json
// @Security     BearerAuth
// @Param        title        formData  string  true  "Event title"
// @Param        address      formData  string  true  "Event address"
// @Param        categoryId   formData  string  true  "Category ID"
// @Param        eventTimes   formData  string  true  "Event times as JSON string"
// @Success      200  {object}  response.APIResponse
// @Failure      400  {object} response.APIResponse
// @Failure      401  {object} response.APIResponse
// @Router       /events [post]
// @Security Bearer
func (h *EventHandler) CreateEventHandler(ctx *gin.Context) (res interface{}, err error) {

	var req dto.CreateEventReq
	//req.Image = ctx.Get("imageURL") // đã gắn trừ middleware
	req.Address = ctx.PostForm("address")
	req.Title = ctx.PostForm("title")
	req.CategoryId = ctx.PostForm("categoryId")

	// Lấy eventTimes dạng JSON string
	eventTimesStr := ctx.PostForm("eventTimes")
	if eventTimesStr == "" {
		return nil, &response.APIError{StatusCode: http.StatusBadRequest, Message: "eventTimes is required", Err: errors.New("eventTimes is required")}
	}

	if err := json.Unmarshal([]byte(eventTimesStr), &req.EventTimes); err != nil {
		return nil, &response.APIError{StatusCode: http.StatusUnauthorized, Message: "invalid eventTimes", Err: errors.New("invalid eventTimes")}
	}

	vl, exist := ctx.Get("hasToken")
	if exist && vl == true {
		claims := ctx.MustGet("claims").(jwt.MapClaims)
		userId, ok := claims["id"].(string)
		if !ok {
			return nil, &response.APIError{StatusCode: http.StatusUnauthorized, Message: "unauthorized", Err: errors.New("unauthorized")}
		}
		req.OrganizerId = userId
		return h.service.CreateEvent(ctx, &req)
	}
	return nil, &response.APIError{StatusCode: http.StatusUnauthorized, Message: "unauthorized", Err: errors.New("unauthorized")}
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
// @Description  Get list events with pagination, pass the JWT bearer token in the header to get the data from the organizer
// @Tags         Events
// @Accept       json
// @Produce      json
// @Param        page query string false "Page number" default(1)
// @Success      200  {object}  response.APIResponse
// @Failure      500  {object}  response.APIResponse
// @Router       /events [get]
// @security Bearer
func (h *EventHandler) GetListEventHandler(ctx *gin.Context) (res interface{}, err error) {
	page := ctx.DefaultQuery("page", "1")
	var rs any
	var error error

	vl, exist := ctx.Get("hasToken")
	if exist && vl == true {
		claims := ctx.MustGet("claims").(jwt.MapClaims)
		userId, ok := claims["id"].(string)
		if !ok {
			return nil, errors.New("user id not found")
		}
		rs, error = h.service.GetEventsListOfOrganizer(ctx, &dto.GetEventsListOfOrganizerReq{Page: page, OrganizerId: userId})
	}

	rs, error = h.service.GetEventsList(ctx, &dto.GetEventsListReq{Page: page})

	if error != nil {
		return nil, error
	}
	return rs, error
}

func NewEventHandler(s *service.EventService) *EventHandler {
	return &EventHandler{
		service: *s,
	}
}
