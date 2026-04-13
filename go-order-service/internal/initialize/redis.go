package initialize

import (
	"fmt"
	"go-order-service/global"

	"github.com/redis/go-redis/v9"
	"golang.org/x/net/context"
)

func InitRedis() {
	r := global.Config.Redis
	rdb := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", r.Host, r.Port),
		Password: r.Password,
		DB:       r.Database,
	})

	_, err := rdb.Ping(context.Background()).Result()
	if err != nil {
		fmt.Printf("Redis connect failed: %v\n", err)
	}

	global.RDB = rdb
}
