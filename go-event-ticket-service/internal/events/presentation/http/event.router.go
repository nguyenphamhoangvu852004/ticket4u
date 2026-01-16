package http

import (
	"go-event-ticket-service/internal/middleware"
	"go-event-ticket-service/pkg/response"

	"github.com/gin-gonic/gin"
)

func RegisterEventRoutes(rg *gin.RouterGroup, handler *EventHandler) {
	event := rg.Group("/events")
	event.GET("", middleware.JWTMiddleware(), response.Wrap(handler.GetListEventHandler))
	event.GET("/:id", response.Wrap(handler.GetEventHandler))
	event.GET("/deleted", response.Wrap(handler.GetDeletedEventsHandler))
	event.POST("", middleware.JWTMiddleware(), middleware.UploadMiddleware(), response.Wrap(handler.CreateEventHandler))
	// event.POST("", middleware.UploadMiddleware(), response.Wrap(handler.CreateEventHandler))
	event.PATCH("/:id", response.Wrap(handler.ModifyEventHandler))
	event.DELETE("/:id", response.Wrap(handler.DeleteEventHandler))
	event.PATCH("/restore/:id", response.Wrap(handler.RestoreEventHandler))
}
