package repository

import (
	"context"
	"encoding/json"
	"go-event-ticket-service/internal/events/domain/repository"

	"resty.dev/v3"
)

type locationRepository struct {
}

// GetListProvinces implements [repository.LocationRepository].
func (l *locationRepository) GetListProvinces(ctx context.Context) (interface{}, error) {
	client := resty.New()
	defer client.Close()
	var myMap []map[string]interface{}
	res, _ := client.R().
		EnableTrace().
		Get("https://provinces.open-api.vn/api/v2/p/")
	_ = json.Unmarshal(res.Bytes(), &myMap)

	// go func() {
	// 	_, err := global.Rdb.SetEx(ctx, "provinces", myMap, time.Duration(5)*time.Minute).Result()
	// 	if err != nil {
	// 		global.Logger.Error("Redis", zap.Error(err))
	// 	}
	// }()
	return myMap, nil
}

// GetListWard implements [repository.LocationRepository].
func (l *locationRepository) GetListWard(ctx context.Context) (interface{}, error) {
	client := resty.New()
	defer client.Close()
	var myMap []map[string]interface{}
	res, _ := client.R().
		EnableTrace().
		Get("https://provinces.open-api.vn/api/v2/w/")

	_ = json.Unmarshal(res.Bytes(), &myMap)
	return myMap, nil
}

func NewLocationRepository() repository.LocationRepository {
	return &locationRepository{}
}
