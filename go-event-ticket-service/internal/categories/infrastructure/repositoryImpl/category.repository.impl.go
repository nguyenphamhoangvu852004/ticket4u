package repository

import (
	"context"
	"database/sql"
	"go-event-ticket-service/internal/categories/domain/entity"
	"go-event-ticket-service/internal/categories/domain/repository"
	"go-event-ticket-service/internal/database"
	"go-event-ticket-service/pkg/common"
)

type categoryRepository struct {
	db    *database.Queries
	dbRaw *sql.DB
}

// GetList implements repository.CategoryRepository.
func (c *categoryRepository) GetList(ctx context.Context) ([]entity.CategoryEntity, error) {
	var items []entity.CategoryEntity

	modelCategories, err := c.db.GetCategories(ctx)
	if err != nil {
		return nil, err
	}

	for _, modelCategory := range modelCategories {
		items = append(items, entity.CategoryEntity{
			ID:          modelCategory.ID,
			Title:       modelCategory.Title,
			Description: modelCategory.Description.String,
			BaseEntity: common.BaseEntity{
				CreatorID:  modelCategory.CreatorID,
				ModifierID: modelCategory.ModifierID,
				DeletorID:  modelCategory.DeletorID,
				CreatedAt:  modelCategory.CreatedAt,
				ModifiedAt: modelCategory.ModifiedAt,
				DeletedAt:  modelCategory.DeletedAt,
			},
		})
	}
	return items, nil
}

func NewCategoryRepository(db *database.Queries, dbRaw *sql.DB) repository.CategoryRepository {
	return &categoryRepository{db: db, dbRaw: dbRaw}
}
