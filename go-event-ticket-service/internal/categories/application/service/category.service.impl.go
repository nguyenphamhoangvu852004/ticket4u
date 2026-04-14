package service

import (
	"context"
	"encoding/json"
	"go-event-ticket-service/internal/categories/application/dto"
	"go-event-ticket-service/internal/categories/domain/repository"
	"go-event-ticket-service/utils"
)

type categoryService struct {
	categoryRepo repository.CategoryRepository
}

// GetListCategoryHandler implements CategoryService.
func (c *categoryService) GetListCategoryHandler(ctx context.Context, req *dto.GetCategoriesListReq) (res *dto.GetCategoriesListRes, err error) {
	// lấy trong cache

	var resDto dto.GetCategoriesListRes

	categoriesInCache, err := utils.GetRedis(ctx, "categories")
	if err == nil && categoriesInCache != "" {
		resDto.Categories = make([]dto.CategoryOutputDTO, 0)
		if err := json.Unmarshal([]byte(categoriesInCache), &resDto); err == nil {
			return &resDto, nil
		}
	}

	// nếu không có trong cache thì lấy trong database
	categories, err := c.categoryRepo.GetList(ctx)
	if err != nil {
		return nil, err
	}
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

	// save to cache before return
	resBytes, err := json.Marshal(resDto)
	if err != nil {
		return nil, err
	}
	err = utils.SaveRedis(ctx, "categories", string(resBytes), 60*60) // TTL 5 minutes
	if err != nil {
		return nil, err
	}

	return &resDto, nil
}

func NewCategoryService(categoryRepo repository.CategoryRepository) CategoryService {
	return &categoryService{categoryRepo: categoryRepo}
}
