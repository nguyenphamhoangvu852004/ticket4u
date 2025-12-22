package http

import (
	"go-event-ticket-service/pkg/response"

	"github.com/gin-gonic/gin"
)

func RegisterEventTimeRoutes(rg *gin.RouterGroup, handler *EventTimeHandler) {

	eventTimeRoot := rg.Group("/eventTimes")
	{
		eventTimeRoot.GET("/:eventTimeId", response.Wrap(handler.GetEventTimeByIDHandler))
		eventTimeRoot.DELETE("/:eventTimeId", response.Wrap(handler.SoftDeleteEventTimeHandler))
	}

	eventTime := rg.Group("/events/:eventId/eventTimes")
	{
		eventTime.POST("", response.Wrap(handler.CreateEventTimeHandler)) // tạo eventTime cho eventId
	}

}
