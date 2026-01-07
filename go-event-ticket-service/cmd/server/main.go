package main

import (
	"fmt"
	_ "go-event-ticket-service/cmd/swag/docs"
	"go-event-ticket-service/global"
	"go-event-ticket-service/internal/initialize"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title          API Document for Event Ticket Service
// @version         1.0
// @description     API Document for Event Ticket Service
// @termsOfService  https://github.com/nguyenphamhoangvu852004/ticket4u

// @contact.name   nguyenphamhoangvu
// @contact.url    https://github.com/nguyenphamhoangvu852004/ticket4u
// @contact.email  nguyenphamhoangvu852004@gmail.com

// @host      localhost:8085
// @BasePath  /api/v1/2025
// @schema     http
func main() {
	app := initialize.Run()

	app.GET("/metrics", gin.WrapH(promhttp.Handler()))
	app.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	app.Run(":" + fmt.Sprint(global.Config.Server.Port))
}
