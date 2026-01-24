package initialize

import (
	"go-event-ticket-service/global"
	"go-event-ticket-service/internal/search/application/service"
	repository "go-event-ticket-service/internal/search/infrastructure/repositoryImpl"
	"go-event-ticket-service/internal/search/presentation/http"
)

func InitSearchService() *http.SearchHandler {
	// Repo
	repo := repository.NewSearchRepository(global.ElasticSearchClient)
	//Service
	sevice := service.NewSearchSerivce(repo)
	//Controller
	handler := http.NewSearchHandler(sevice)
	return handler
}
