package service

import (
	"context"
	"go-event-ticket-service/internal/categories/application/dto"
	"go-event-ticket-service/internal/categories/domain/repository"
)

type categoryService struct {
	categoryRepo repository.CategoryRepository
}

// GetListCategoryHandler implements CategoryService.
func (c *categoryService) GetListCategoryHandler(ctx context.Context, req *dto.GetCategoriesListReq) (res *dto.GetCategoriesListRes, err error) {
	categories, err := c.categoryRepo.GetList(ctx)
	if err != nil {
		return nil, err
	}
	var resDto dto.GetCategoriesListRes
	for _, category := range categories {
		resDto.Categories = append(resDto.Categories, dto.CategoryOutputDTO{
			ID:          category.ID,
			Title:       category.Title,
			Description: category.Description,
			CreatorID:   category.BaseEntity.CreatorID,
			ModifierID:  category.BaseEntity.ModifierID,
			DeletorID:   category.BaseEntity.DeletorID,
			CreatedAt:   category.BaseEntity.CreatedAt,
			ModifiedAt:  category.BaseEntity.ModifiedAt,
			DeletedAt:   category.BaseEntity.DeletedAt,
		})
	}
	return &resDto, nil
}

func NewCategoryService(categoryRepo repository.CategoryRepository) CategoryService {
	return &categoryService{categoryRepo: categoryRepo}
}
