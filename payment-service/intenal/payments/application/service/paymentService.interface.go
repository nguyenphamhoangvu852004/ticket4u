package service

import (
	"go-learn/intenal/payments/application/dto"

	"github.com/gin-gonic/gin"
)

type PaymentServiceInterface interface {
	CreatePaymentURl(ctx *gin.Context, reqData *dto.CreatePaymentURLRequestDTO) (interface{}, error)
	CheckTransaction(ctx *gin.Context, reqData *dto.CheckTransactionRequestDTO) (interface{}, error)
	Callback(ctx *gin.Context, reqData *dto.MomoCallback) (interface{}, error)
	TestConnectKafka(ctx *gin.Context)
}
