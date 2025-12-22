package http

import (
	"go-event-ticket-service/pkg/response"

	"github.com/gin-gonic/gin"
)

func RegisterTicketRoutes(rg *gin.RouterGroup, handler *TicketHandler) {
	eventTimes := rg.Group("/eventTimes/:eventTimeId")
	{
		eventTimes.GET("/tickets", response.Wrap(handler.GetTicketsByEventTimeIdHandler))
		eventTimes.POST("/tickets", response.Wrap(handler.CreateTicketHandler))
	}

	ticket := rg.Group("/tickets")
	{
		ticket.GET("", response.Wrap(handler.GetAllTicketsHandler))
		ticket.GET("/:ticketId", response.Wrap(handler.GetTicketByIDHandler))
		ticket.PATCH("/:ticketId", response.Wrap(handler.UpdateTicketHandler))
		ticket.DELETE("/:ticketId", response.Wrap(handler.SoftDeleteTicketHandler))
		ticket.PATCH("/:ticketId/restore", response.Wrap(handler.RestoreTicketHandler))
	}
}
