package http

import (
	"go-event-ticket-service/internal/tickets/application/dto"
	"go-event-ticket-service/internal/tickets/application/service"

	"github.com/gin-gonic/gin"
)

type TicketHandler struct {
	service service.TicketService
}

func (h *TicketHandler) CreateTicketHandler(ctx *gin.Context) (res interface{}, err error) {
	var reqData dto.CreateTicketReq
	if err := ctx.ShouldBindJSON(&reqData); err != nil {
		return nil, err
	}
	reqData.EventTimeId = ctx.Param("eventTimeId")
	return h.service.CreateTicket(ctx, &reqData)
}

func (h *TicketHandler) GetAllTicketsHandler(ctx *gin.Context) (res interface{}, err error) {
	var page string
	page = ctx.Query("page")
	return h.service.GetAllTickets(ctx, &dto.GetTicketsListReq{Page: page})
}

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

func (h *TicketHandler) SoftDeleteTicketHandler(ctx *gin.Context) (res interface{}, err error) {
	var reqData dto.DeleteTicketReq
	if err := ctx.ShouldBindJSON(&reqData); err != nil {
		return nil, err
	}
	reqData.ID = ctx.Param("ticketId")
	return h.service.DeleteTicket(ctx, &reqData)
}

func (h *TicketHandler) GetTicketByIDHandler(ctx *gin.Context) (res interface{}, err error) {
	return h.service.GetTicketByID(ctx, ctx.Param("ticketId"))
}

func (h *TicketHandler) GetTicketsHandler(ctx *gin.Context) (res interface{}, err error) {
	panic("unimplemented")
}

func NewTicketHandler(s *service.TicketService) *TicketHandler {
	return &TicketHandler{
		service: *s,
	}
}
