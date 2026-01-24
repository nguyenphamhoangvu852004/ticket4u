package http

import (
	"go-event-ticket-service/pkg/response"

	"github.com/gin-gonic/gin"
)

func RegisterSearchRoutes(rg *gin.RouterGroup, handler *SearchHandler) {
	search := rg.Group("/search")
	search.GET("", response.Wrap(handler.SearchHandler))
}
