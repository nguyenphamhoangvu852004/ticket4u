package initialize

import (
	"go-event-ticket-service/global"
	"go-event-ticket-service/pkg/logger"
)

func InitLogger() {
	global.Logger = logger.NewLogger(global.Config.Log)
}
