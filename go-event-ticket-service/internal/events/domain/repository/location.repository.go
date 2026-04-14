package repository

import "context"

type LocationRepository interface {
	GetListWard(ctx context.Context) (interface{}, error)
	GetListProvinces(ctx context.Context) (interface{}, error)
}
