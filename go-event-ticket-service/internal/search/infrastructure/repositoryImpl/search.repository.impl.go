package repository

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"go-event-ticket-service/internal/search/application/mapper"
	"go-event-ticket-service/internal/search/domain/entity"
	"go-event-ticket-service/internal/search/domain/repository"

	"github.com/elastic/go-elasticsearch/v9"
)

type searchRepository struct {
	elastic9 *elasticsearch.Client
}

// Query implements repository.SearchRepository.
func (s *searchRepository) Query(ctx context.Context, criteria *entity.EventSearchCriteria) (resData interface{}, err error) {
	body := buildSearchQueryV2(criteria)

	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(body); err != nil {
		return nil, err
	}
	fmt.Println(buf.String())

	res, err := s.elastic9.Search(
		s.elastic9.Search.WithContext(ctx),
		s.elastic9.Search.WithIndex("events"),
		s.elastic9.Search.WithBody(&buf),
		s.elastic9.Search.WithTrackTotalHits(true),
	)

	if err != nil {
		return nil, err
	}
	if res == nil {
		return nil, errors.New("elasticsearch response is nil")
	}

	fmt.Println(res.Body)
	defer res.Body.Close()
	// if err != nil {
	// 	fmt.Println(err)
	// 	return nil, err
	// }
	// if res.IsError() {
	// 	rawBody, _ := io.ReadAll(res.Body)

	// 	return nil, fmt.Errorf(
	// 		"elasticsearch error [%s]: %s",
	// 		res.Status(),
	// 		string(rawBody),
	// 	)

	// }
	// fmt.Println("ES STATUS:", res.Status())
	return mapper.MapESResponse(res.Body)
}

func NewSearchRepository(elastic9 *elasticsearch.Client) repository.SearchRepository {
	return &searchRepository{
		elastic9: elastic9,
	}
}
func buildSearchQueryV1(criteria *entity.EventSearchCriteria) map[string]interface{} {
	must := []interface{}{}
	filter := []interface{}{}

	if criteria.Keyword != "" {
		must = append(must, map[string]interface{}{
			"match_phrase": map[string]interface{}{
				"query":  criteria.Keyword,
				"fields": []string{"title", "address"},
			},
		})
	}

	if len(criteria.CategoryIDs) > 0 {
		filter = append(filter, map[string]interface{}{
			"terms": map[string]interface{}{
				"category.id": criteria.CategoryIDs,
			},
		})
	}
	query := map[string]interface{}{
		"bool": map[string]interface{}{
			"must":   must,
			"filter": filter,
		},
	}
	return map[string]interface{}{
		"query": query,
		"from":  (criteria.Pagination.Page - 1) * criteria.Pagination.Limit,
		"size":  criteria.Pagination.Limit,
	}
}

func buildSearchQueryV2(criteria *entity.EventSearchCriteria) map[string]interface{} {
	// 1. Chuẩn bị các ngăn chứa điều kiện
	// "must": Dùng cho Keyword (có tính điểm score)
	mustQueries := []interface{}{}
	// "filter": Dùng cho Category, Status... (không tính điểm, nhanh hơn)
	filterQueries := []interface{}{}

	// ---------------------------------------------------------
	// 2. Xử lý Keyword (Logic: Có từ khóa -> Multi Match, Không có -> Match All)
	if criteria.Keyword != "" {
		mustQueries = append(mustQueries, map[string]interface{}{
			"multi_match": map[string]interface{}{
				"query":     criteria.Keyword,
				"fields":    []string{"title^3", "address^2", "category.title"},
				"fuzziness": 1, // Hoặc dùng "AUTO"
			},
		})
	} else {
		mustQueries = append(mustQueries, map[string]interface{}{
			"match_all": map[string]interface{}{},
		})
	}

	// ---------------------------------------------------------
	// 3. Xử lý Category (Logic: Dùng Terms và đưa vào Filter)
	if len(criteria.CategoryIDs) > 0 {
		filterQueries = append(filterQueries, map[string]interface{}{
			"terms": map[string]interface{}{
				// Lưu ý: Thường ID phải dùng .keyword để tìm chính xác
				"category.id.keyword": criteria.CategoryIDs,
			},
		})
	}

	// ---------------------------------------------------------
	// 4. Tính toán phân trang
	if criteria.Pagination.Page < 1 {
		criteria.Pagination.Page = 1
	}
	if criteria.Pagination.Limit < 1 {
		criteria.Pagination.Limit = 10
	}
	from := (criteria.Pagination.Page - 1) * criteria.Pagination.Limit

	// ---------------------------------------------------------
	// 5. Đóng gói (Assemble) lại thành map hoàn chỉnh
	// Lúc này mới gán must và filter vào bool query
	queryBody := map[string]interface{}{
		"from": from,
		"size": criteria.Pagination.Limit,
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"must":   mustQueries,
				"filter": filterQueries,
			},
		},
		// Có thể thêm sort nếu cần
		// "sort": []map[string]interface{}{{"created_at": "desc"}},
	}

	return queryBody
}
