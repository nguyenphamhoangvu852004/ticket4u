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

// @Summary Restore event
// @Description Restore a soft-deleted event by its ID
// @Tags Events
// @Accept json
// @Produce json
// @Security Bearer
// @Param id path string true "Event ID"
// @Success 200 {object} response.APIResponse{data=dto.RestoreEventRes}
// @Failure 401 {object} response.APIResponse
// @Failure 404 {object} response.APIResponse
// @Router /events/restore/{id} [patch]
func (h *EventHandler) RestoreEventHandler(ctx *gin.Context) (res interface{}, err error) {
	return nil, h.service.RestoreEvent(ctx, &dto.RestoreEventReq{ID: ctx.Param("id")})
}

// @Summary Get deleted events
// @Description Get a list of soft-deleted events with pagination
// @Tags Events
// @Accept json
// @Produce json
// @Security Bearer
// @Param page query string false "Page number" default(1)
// @Success 200 {object} response.APIResponse{data=dto.GetDeletedListRes}
// @Failure 401 {object} response.APIResponse
// @Failure 500 {object} response.APIResponse
// @Router /events/deleted [get]
func (h *EventHandler) GetDeletedEventsHandler(ctx *gin.Context) (res interface{}, err error) {
	return h.service.GetDeletedList(ctx, &dto.GetDeletedListReq{Page: ctx.Query("page")})
}

// @Summary Delete event
// @Description Soft-delete an event by its ID
// @Tags Events
// @Accept json
// @Produce json
// @Security Bearer
// @Param id path string true "Event ID"
// @Success 200 {object} response.APIResponse
// @Failure 401 {object} response.APIResponse
// @Failure 404 {object} response.APIResponse
// @Router /events/{id} [delete]
func (h *EventHandler) DeleteEventHandler(ctx *gin.Context) (res interface{}, err error) {
	return nil, h.service.DeleteEvent(ctx, &dto.DeleteEventReq{ID: ctx.Param("id")})

}

// @Summary Modify event
// @Description Update event information
// @Tags Events
// @Accept json
// @Produce json
// @Security Bearer
// @Param id path string true "Event ID"
// @Param req body dto.ModifyEventReq true "Modify event request"
// @Success 200 {object} response.APIResponse{data=dto.ModifyEventRes}
// @Failure 400 {object} response.APIResponse
// @Failure 401 {object} response.APIResponse
// @Failure 404 {object} response.APIResponse
// @Router /events/{id} [patch]
func (h *EventHandler) ModifyEventHandler(ctx *gin.Context) (res interface{}, err error) {
	id := ctx.Param("id")
	var req dto.ModifyEventReq

	if err := ctx.ShouldBind(&req); err != nil {
		return nil, err
	}
	req.ID = id

	return h.service.ModifyEvent(ctx, &req)
}

// @Summary Create event
// @Description Create a new event. The `eventTimes` parameter must be a JSON string of []EventTimeDTO.
// @Tags Events
// @Accept multipart/form-data
// @Produce json
// @Security Bearer
// @Param title formData string true "Event title"
// @Param address formData string true "Event address"
// @Param categoryId formData string true "Category ID"
// @Param image formData file false "Event image"
// @Param eventTimes formData string true "JSON array of EventTimeDTO. Attributes: startTime (string), endTime (string), description (string), tickets ([]TicketDTO). TicketDTO attributes: title (string), price (string), status (string), quantity (string)." example([{"startTime":"2025-03-01T10:00:00Z","endTime":"2025-03-01T12:00:00Z","description":"Show 1","tickets":[{"title":"Standard","price":"50","status":"available","quantity":"100"}]}])
// @Success 200 {object} response.APIResponse{data=dto.CreateEventRes}
// @Failure 400 {object} response.APIResponse
// @Failure 401 {object} response.APIResponse
// @Failure 500 {object} response.APIResponse
// @Router /events [post]
func (h *EventHandler) CreateEventHandler(ctx *gin.Context) (res interface{}, err error) {

	var req dto.CreateEventReq
	vl, exist := ctx.Get("imageURL") // đã gắn trừ middleware
	if exist && vl != nil {
		req.ImageURL = vl.(string)
	}
	req.Address = ctx.PostForm("address")
	req.Title = ctx.PostForm("title")
	req.CategoryId = ctx.PostForm("categoryId")
	// req.ImageURL = ctx.Get("imageURL")
	// Lấy eventTimes dạng JSON string
	eventTimesStr := ctx.PostForm("eventTimes")
	if eventTimesStr == "" {
		return nil, &response.APIError{StatusCode: http.StatusBadRequest, Message: "eventTimes is required", Err: errors.New("eventTimes is required")}
	}

	if err := json.Unmarshal([]byte(eventTimesStr), &req.EventTimes); err != nil {
		return nil, &response.APIError{StatusCode: http.StatusUnauthorized, Message: "invalid eventTimes", Err: errors.New("invalid eventTimes")}
	}

	vl, exist = ctx.Get("hasToken")
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

// @Summary Get event by ID
// @Description Get details of a single event by its ID
// @Tags Events
// @Accept json
// @Produce json
// @Param id path string true "Event ID"
// @Success 200 {object} response.APIResponse{data=dto.GetEventByIDRes}
// @Failure 404 {object} response.APIResponse
// @Router /events/{id} [get]
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

// @Summary      Get list events
// @Description  Get list events with pagination. If a valid JWT token is provided, it returns events owned by the organizer. Otherwise, it returns all available events.
// @Tags         Events
// @Accept       json
// @Produce      json
// @Param        page query string false "Page number" default(1)
// @Success      200  {object}  response.APIResponse{data=dto.GetEventsListRes} "Returns dto.GetEventsListRes or dto.GetEventsListOfOrganizerRes depending on authentication"
// @Failure      500  {object}  response.APIResponse
// @Router       /events [get]
// @Security Bearer
func (h *EventHandler) GetListEventHandler(ctx *gin.Context) (res interface{}, err error) {
	page := ctx.DefaultQuery("page", "1")

	vl, exist := ctx.Get("hasToken")
	if exist && vl == true {
		claims := ctx.MustGet("claims").(jwt.MapClaims)
		userId, ok := claims["id"].(string)
		if !ok {
			return nil, errors.New("user id not found")
		}
		return h.service.GetEventsListOfOrganizer(ctx, &dto.GetEventsListOfOrganizerReq{Page: page, OrganizerId: userId})
	}

	return h.service.GetEventsList(ctx, &dto.GetEventsListReq{Page: page})
}

func NewEventHandler(s *service.EventService) *EventHandler {
	return &EventHandler{
		service: *s,
	}
}
