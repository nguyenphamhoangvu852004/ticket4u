package service

import (
	"context"
	"go-event-ticket-service/internal/search/application/dto"
	"go-event-ticket-service/internal/search/application/mapper"
	"go-event-ticket-service/internal/search/domain/repository"
)

type searchService struct {
	searchRepo repository.SearchRepository
}

// ExecuteSearch implements SearchService.
func (s *searchService) ExecuteSearch(ctx context.Context, reqData *dto.SearchEventRequest) (resData interface{}, err error) {
	//entity
	newEntity, err := mapper.ToEventSearchCriteria(*reqData)
	if err != nil {
		return nil, err
	}

	return s.searchRepo.Query(ctx, newEntity)
}

func NewSearchSerivce(repo repository.SearchRepository) SearchService {
	return &searchService{
		searchRepo: repo,
	}
}
