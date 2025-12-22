package http

import (
	"go-event-ticket-service/pkg/response"

	"github.com/gin-gonic/gin"
)

func RegisterCategoryRoutes(rg *gin.RouterGroup, handler *CategoryHandler) {
	category := rg.Group("/categories")
	category.GET("", response.Wrap(handler.GetListCategoryHandler))
}
