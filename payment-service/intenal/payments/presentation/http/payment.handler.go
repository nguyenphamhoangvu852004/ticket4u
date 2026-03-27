package http

import (
	"fmt"
	"go-learn/intenal/payments/application/dto"
	"go-learn/intenal/payments/application/service"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

type PaymentHandler struct {
	service service.PaymentServiceInterface
}

func (h *PaymentHandler) TestConnectKafka(ctx *gin.Context) {
	h.service.TestConnectKafka(ctx)
	return
}

func (h *PaymentHandler) Callback(ctx *gin.Context) {
	var body *dto.MomoCallback
	if err := ctx.ShouldBindBodyWith(&body, binding.JSON); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Body:", body)

	if body.ResultCode == 0 {
		resp, err := h.service.Callback(ctx, body)
		if err != nil {
			ctx.JSON(400, map[string]any{
				"code":  400,
				"error": err.Error(),
			})
		} else {

			ctx.JSON(400, map[string]any{
				"code": 400,
				"data": resp,
			})
		}
	}
	return
}

func (h *PaymentHandler) CheckTransaction(ctx *gin.Context) {
	var reqDTO dto.CheckTransactionRequestDTO

	if err := ctx.ShouldBindBodyWithJSON(&reqDTO); err != nil {
		ctx.JSON(400, map[string]any{
			"code":  400,
			"error": err.Error(),
		})
	}

	res, err := h.service.CheckTransaction(ctx, &reqDTO)

	if err != nil {
		ctx.JSON(500, map[string]any{
			"code":  500,
			"error": err.Error(),
		})
	}

	ctx.JSON(200, map[string]any{
		"code": 200,
		"data": res,
	})

	return
}

func (h *PaymentHandler) GetPaymentUrl(ctx *gin.Context) {
	var reqDTO dto.CreatePaymentURLRequestDTO

	if err := ctx.ShouldBindBodyWithJSON(&reqDTO); err != nil {
		ctx.JSON(400, map[string]any{
			"code":  400,
			"error": err.Error(),
		})
	}

	res, err := h.service.CreatePaymentURl(ctx, &reqDTO)

	if err != nil {
		ctx.JSON(500, map[string]any{
			"code":  500,
			"error": err.Error(),
		})
	}

	ctx.JSON(200, map[string]any{
		"code": 200,
		"data": res,
	})

	return
}

func NewPaymentHandler(service service.PaymentServiceInterface) *PaymentHandler {
	return &PaymentHandler{
		service: service,
	}
}
