package initialize

import (
	"go-event-ticket-service/global"

	"github.com/gin-gonic/gin"
)

func Run() *gin.Engine {
	LoadConfig()
	InitLogger()
	InitMysqlC()
	InitRedis()
	InitKafkaV2()
	app := InitRouter(global.DbQueries, global.Mdbc)
	InitEurekaClient()
	return app
}
