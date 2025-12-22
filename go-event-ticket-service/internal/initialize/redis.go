package initialize

import (
	"context"
	"fmt"
	"go-event-ticket-service/global"
	"go-event-ticket-service/utils"

	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
)

var ctx = context.Background()

func InitRedis() {
	r := global.Config.Redis
	rdb := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%d", r.Host, r.Port),
		Password: r.Password, // no password set
		DB:       r.Database, // use default DB
		PoolSize: 3,
	})

	if err := rdb.Ping(ctx).Err(); err != nil {
		global.Logger.Error(err.Error())
		utils.CallLogger(utils.ErrorLevel, "Redis Connected", err, zap.String("error", err.Error()))
		panic(err)
	} else {
		global.Rdb = rdb
		utils.CallLogger(utils.InfoLevel, "Redis Connected", nil, zap.Bool("isSuccess", true))
	}

	// redisExample()
}

func redisExample() {
	if err := global.Rdb.Set(ctx, "test", "Hello Redis", 0).Err(); err != nil {
		global.Logger.Error(err.Error())
		panic(err)
	}
	result, err := global.Rdb.Get(ctx, "test").Result()
	if err != nil {
		global.Logger.Error(err.Error())
		panic(err)
	}
	global.Logger.Info(result)
}
