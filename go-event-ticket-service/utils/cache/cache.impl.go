package utils

import (
	"context"
	"go-event-ticket-service/utils"
	"time"

	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
)

type Cacher struct {
	redis *redis.Client
}

func (cacher *Cacher) SaveRedis(ctx context.Context, key string, value string, second int) error {
	// if global.Rdb == nil {
	// 	return fmt.Errorf("redis client not initialized")
	// }
	_, err := cacher.redis.Set(ctx, key, value, time.Duration(second)*time.Second).Result()
	if err != nil {
		utils.CallLogger(utils.ErrorLevel, "Redis Save Error", err, zap.String("key", key))
		return err
	}
	return nil
}

func (cacher *Cacher) GetRedis(ctx context.Context, key string) (string, error) {
	result, err := cacher.redis.Get(ctx, key).Result()
	if err != nil {
		utils.CallLogger(utils.ErrorLevel, "Redis Get Error", err, zap.String("key", key))
		if err == redis.Nil {
			return "", nil
		}
		return "", err
	}
	return result, nil
}

func (cacher *Cacher) DeleteRedis(ctx context.Context, key string) error {
	if err := cacher.redis.Del(ctx, key).Err(); err != nil {
		utils.CallLogger(utils.ErrorLevel, "Redis Delete Error", err, zap.String("key", key))
		return err
	}
	return nil
}

func (cacher *Cacher) GetRedisKeys(ctx context.Context, pattern string) ([]string, error) {
	keys, err := cacher.redis.Keys(ctx, pattern).Result()
	if err != nil {
		utils.CallLogger(utils.ErrorLevel, "Redis Get Keys Error", err, zap.String("pattern", pattern))
		return nil, err
	}
	return keys, nil
}

func NewCacher(redisClient *redis.Client) CacherInterface {
	return &Cacher{
		redis: redisClient,
	}
}
