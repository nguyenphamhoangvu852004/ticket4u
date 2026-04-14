package http

import (
	"go-event-ticket-service/internal/categories/application/dto"
	"go-event-ticket-service/internal/categories/application/service"

	"github.com/gin-gonic/gin"
)

type CategoryHandler struct {
	service service.CategoryService
}

// Get available categories documentation
// @Summary      Get list categories
// @Description  Get list categories
// @Tags         Categories
// @Success      200  {object}  response.APIResponse
// @Failure      500  {object}  response.APIResponse
// @Router       /categories [get]
func (c *CategoryHandler) GetListCategoryHandler(ctx *gin.Context) (res interface{}, err error) {
	rs, err := c.service.GetListCategoryHandler(ctx, &dto.GetCategoriesListReq{})
	if err != nil {
		return nil, err
	}
	return rs, err
}

func NewCategoryHandler(s *service.CategoryService) *CategoryHandler {
	return &CategoryHandler{
		service: *s,
	}
}
