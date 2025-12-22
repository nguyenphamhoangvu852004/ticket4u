package initialize

import (
	"database/sql"
	"go-event-ticket-service/internal/categories/application/service"
	categoryRepository "go-event-ticket-service/internal/categories/infrastructure/repositoryImpl"
	"go-event-ticket-service/internal/categories/presentation/http"
	"go-event-ticket-service/internal/database"
)

func InitCategoryService(db *database.Queries, dbRaw *sql.DB) *http.CategoryHandler {
	categoryRepo := categoryRepository.NewCategoryRepository(db, dbRaw)
	service := service.NewCategoryService(categoryRepo)
	handler := http.NewCategoryHandler(&service)
	return handler
}
