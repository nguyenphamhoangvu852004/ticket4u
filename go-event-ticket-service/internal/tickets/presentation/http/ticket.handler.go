package http

import (
	"go-event-ticket-service/internal/tickets/application/dto"
	"go-event-ticket-service/internal/tickets/application/service"
	"strings"

	"github.com/gin-gonic/gin"
)

type TicketHandler struct {
	service service.TicketService
}

// @Summary Create ticket
// @Description Create a new ticket for a specific event time
// @Tags Tickets
// @Accept json
// @Produce json
// @Param eventTimeId path string true "Event Time ID"
// @Param req body dto.CreateTicketReq true "Create ticket request"
// @Success 200 {object} response.APIResponse{data=dto.CreateTicketRes}
// @Failure 400 {object} response.APIResponse
// @Failure 500 {object} response.APIResponse
// @Router /eventTimes/{eventTimeId}/tickets [post]
func (h *TicketHandler) CreateTicketHandler(ctx *gin.Context) (res interface{}, err error) {
	var reqData dto.CreateTicketReq
	if err := ctx.ShouldBindJSON(&reqData); err != nil {
		return nil, err
	}
	reqData.EventTimeId = ctx.Param("eventTimeId")
	return h.service.CreateTicket(ctx, &reqData)
}

// @Summary Get all tickets
// @Description Get a paginated list of all tickets
// @Tags Tickets
// @Accept json
// @Produce json
// @Param page query string false "Page number" default(1)
// @Success 200 {object} response.APIResponse{data=dto.GetTicketsListRes}
// @Failure 500 {object} response.APIResponse
// @Router /tickets [get]
func (h *TicketHandler) GetAllTicketsHandler(ctx *gin.Context) (res interface{}, err error) {
	var page string
	page = ctx.Query("page")

	var idsStrings = ctx.Query("ids")
	var ids []string
	if idsStrings == "" {
		return h.service.GetAllTickets(ctx, &dto.GetTicketsListReq{Page: page})
	}else{
		ids = strings.Split(idsStrings,",")
		return h.service.GetTicketsByIds(ctx, ids)
	}
}

// @Summary Get tickets by event time ID
// @Description Get a list of tickets for a specific event time
// @Tags Tickets
// @Accept json
// @Produce json
// @Param eventTimeId path string true "Event Time ID"
// @Success 200 {object} response.APIResponse{data=dto.GetTicketsByEventTimeIdRes}
// @Failure 404 {object} response.APIResponse
// @Router /eventTimes/{eventTimeId}/tickets [get]
func (h *TicketHandler) GetTicketsByEventTimeIdHandler(ctx *gin.Context) (res interface{}, err error) {
	eventTimeId := ctx.Param("eventTimeId")
	return h.service.GetTicketsByEventTimeId(ctx, &dto.GetTicketsByEventTimeIdReq{
		EventTimeID: eventTimeId,
	})
}

func (h *TicketHandler) RestoreTicketHandler(ctx *gin.Context) (res interface{}, err error) {
	panic("unimplemented")
}

func (h *TicketHandler) UpdateTicketHandler(ctx *gin.Context) (res interface{}, err error) {
	panic("unimplemented")
}

// @Summary Soft delete ticket
// @Description Soft delete a ticket by its ID
// @Tags Tickets
// @Accept json
// @Produce json
// @Param ticketId path string true "Ticket ID"
// @Param req body dto.DeleteTicketReq true "Delete ticket request"
// @Success 200 {object} response.APIResponse{data=dto.DeleteTicketRes}
// @Failure 400 {object} response.APIResponse
// @Failure 500 {object} response.APIResponse
// @Router /tickets/{ticketId} [delete]
func (h *TicketHandler) SoftDeleteTicketHandler(ctx *gin.Context) (res interface{}, err error) {
	var reqData dto.DeleteTicketReq
	if err := ctx.ShouldBindJSON(&reqData); err != nil {
		return nil, err
	}
	reqData.ID = ctx.Param("ticketId")
	return h.service.DeleteTicket(ctx, &reqData)
}

// @Summary Get ticket by ID
// @Description Get details of a single ticket by its ID
// @Tags Tickets
// @Accept json
// @Produce json
// @Param ticketId path string true "Ticket ID"
// @Success 200 {object} response.APIResponse{data=dto.GetTicketByIDRes}
// @Failure 404 {object} response.APIResponse
// @Router /tickets/{ticketId} [get]
func (h *TicketHandler) GetTicketByIDHandler(ctx *gin.Context) (res interface{}, err error) {
	data, err := h.service.GetTicketByID(ctx, ctx.Param("ticketId"))
	if err != nil {
		return nil, err
	}
	return data, nil
}

func (h *TicketHandler) GetTicketsHandler(ctx *gin.Context) (res interface{}, err error) {
	panic("unimplemented")
}

func NewTicketHandler(s *service.TicketService) *TicketHandler {
	return &TicketHandler{
		service: *s,
	}
}
