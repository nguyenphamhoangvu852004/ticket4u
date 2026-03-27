package utils

import "context"

type CacherInterface interface {
	SaveRedis(ctx context.Context, key string, value string, second int) error
	GetRedis(ctx context.Context, key string) (string, error)
	DeleteRedis(ctx context.Context, key string) error
}
