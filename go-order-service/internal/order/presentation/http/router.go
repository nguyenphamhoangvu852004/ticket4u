package http

import (
	"github.com/gin-gonic/gin"
)

func InitOrderRouter(r *gin.Engine, h *OrderHandler) {
	orderGroup := r.Group("/orders")
	{
		orderGroup.GET("/:orderId", h.GetOrderByID)
		orderGroup.POST("", h.CreateOrder)
		orderGroup.DELETE("/:orderId", h.SoftDelete)

		// Admin routes
		adminGroup := orderGroup.Group("/admin")
		{
			adminGroup.PATCH("/status", h.UpdateStatus)
			adminGroup.GET("", h.GetMany)
		}

		// User routes
		userGroup := orderGroup.Group("/my-orders")
		{
			userGroup.GET("", h.GetManyByUser)
		}
	}
}
