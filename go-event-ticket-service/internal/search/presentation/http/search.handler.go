package http

import (
	"errors"
	"go-event-ticket-service/internal/search/application/dto"
	"go-event-ticket-service/internal/search/application/service"
	"go-event-ticket-service/pkg/response"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SearchHandler struct {
	service service.SearchService
}

func (h *SearchHandler) SearchHandler(ctx *gin.Context) (res interface{}, err error) {
	var req dto.SearchEventRequest

	if err := ctx.ShouldBindBodyWithJSON(&req); err != nil {
		return nil, &response.APIError{StatusCode: http.StatusBadRequest, Message: "Wrong input", Err: errors.New("Wrong input")}
	}
	// Default values
	if req.Page <= 0 {
		req.Page = 1
	}
	if req.Limit <= 0 || req.Limit > 50 {
		req.Limit = 20
	}

	res, err = h.service.ExecuteSearch(ctx.Request.Context(), &req)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func NewSearchHandler(s service.SearchService) *SearchHandler {
	return &SearchHandler{
		service: s,
	}
}
