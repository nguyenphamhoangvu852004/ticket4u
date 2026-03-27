package http

import "github.com/gin-gonic/gin"

func RegisterPaymentRoutes(rg *gin.RouterGroup, handler *PaymentHandler) {
	payment := rg.Group("/payments")

	payment.POST("", handler.GetPaymentUrl)
	payment.POST("/callback", handler.Callback)
	payment.POST("/check", handler.CheckTransaction)
	payment.POST("/kafka", handler.TestConnectKafka)
}
