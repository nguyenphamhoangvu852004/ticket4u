package utils

import (
	"context"
	"fmt"
	"go-event-ticket-service/global"
	"time"

	"go.uber.org/zap"
)

func SaveRedis(ctx context.Context, key string, value string, ttl int) error {
	if global.Rdb == nil {
		return fmt.Errorf("redis client not initialized")
	}

	_, err := global.Rdb.Set(ctx, key, value, time.Duration(ttl)*time.Second).Result()
	if err != nil {
		CallLogger(ErrorLevel, "Redis Save Error", err, zap.String("key", key))
		return err
	}

	return nil
}

func GetRedis(ctx context.Context, key string) (string, error) {
	result, err := global.Rdb.Get(ctx, key).Result()
	if err != nil {
		CallLogger(ErrorLevel, "Redis Get Error", err, zap.String("key", key))
		return "", err
	}
	return result, nil
}

func DeleteRedis(ctx context.Context, key string) error {
	if err := global.Rdb.Del(ctx, key).Err(); err != nil {
		CallLogger(ErrorLevel, "Redis Delete Error", err, zap.String("key", key))
		return err
	}
	return nil
}

func GetRedisKeys(ctx context.Context, pattern string) ([]string, error) {
	keys, err := global.Rdb.Keys(ctx, pattern).Result()
	if err != nil {
		CallLogger(ErrorLevel, "Redis Get Keys Error", err, zap.String("pattern", pattern))
		return nil, err
	}
	return keys, nil
}
