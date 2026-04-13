package http

import (
	"go-order-service/internal/order/application/dto"
	"go-order-service/internal/order/application/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type OrderHandler struct {
	orderService service.IOrderService
}

func NewOrderHandler(orderService service.IOrderService) *OrderHandler {
	return &OrderHandler{
		orderService: orderService,
	}
}

func (h *OrderHandler) CreateOrder(c *gin.Context) {
	var req dto.CreateOrderReqDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// In a real app, userId would come from JWT middleware
	// For now, we take it from the request or provide a default
	if req.UserId == "" {
		req.UserId = "guest"
	}

	res, err := h.orderService.CreateOrder(c.Request.Context(), &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, res)
}

func (h *OrderHandler) GetOrderByID(c *gin.Context) {
	orderID := c.Param("orderId")
	req := &dto.GetOrderByIDReqDto{OrderID: orderID}

	res, err := h.orderService.GetOrderByID(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *OrderHandler) GetMany(c *gin.Context) {
	page := c.DefaultQuery("page", "1")
	size := c.DefaultQuery("size", "10")
	req := &dto.GetListOrderReqDto{Page: page, Size: size}

	res, err := h.orderService.GetListOrder(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *OrderHandler) GetManyByUser(c *gin.Context) {
	userID := c.Query("userId")
	page := c.DefaultQuery("page", "1")
	size := c.DefaultQuery("size", "10")
	req := &dto.GetListOrderByUserReqDto{UserId: userID, Page: page, Size: size}

	res, err := h.orderService.GetListOrderByUser(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *OrderHandler) UpdateStatus(c *gin.Context) {
	var req dto.UpdateStatusOrderReqDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := h.orderService.UpdateStatusOrder(c.Request.Context(), &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *OrderHandler) SoftDelete(c *gin.Context) {
	orderID := c.Param("orderId")
	var req dto.SoftDeleteOrderReqDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := h.orderService.SoftDeleteOrder(c.Request.Context(), &req, orderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}
