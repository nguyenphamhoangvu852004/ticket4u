package main

import (
	"context"
	"fmt"
	repository "go-event-ticket-service/internal/events/infrastructure/repositoryImpl"
)

var (
	ctx = context.Background()
)

func main() {
	repo := repository.NewLocationRepository()
	res, _ := repo.GetListProvinces(ctx)

	fmt.Println(res)
}
