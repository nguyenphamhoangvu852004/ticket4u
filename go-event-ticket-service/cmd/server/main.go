package main

import (
	"fmt"
	"go-event-ticket-service/global"
	"go-event-ticket-service/internal/initialize"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
	app := initialize.Run()

	app.GET("/metrics", gin.WrapH(promhttp.Handler()))

	app.Run(":" + fmt.Sprint(global.Config.Server.Port))
}
