package initialize

import (
	"fmt"
	"go-order-service/global"
	"go-order-service/internal/order/infrastructure/api"
	"go-order-service/internal/order/infrastructure/repository"
	"go-order-service/internal/order/presentation/http"
	"go-order-service/internal/order/application/service"

	"github.com/gin-gonic/gin"
)

func Run() {
	LoadConfig()
	InitLogger()
	InitMysql()
	InitRedis()
	InitKafka()

	r := gin.Default()

	// Dependency Injection
	orderRepo := repository.NewOrderRepository()
	orderItemRepo := repository.NewOrderItemRepository()
	productClient := api.NewProductClient()
	
	orderService := service.NewOrderService(orderRepo, orderItemRepo, productClient)
	orderHandler := http.NewOrderHandler(orderService)

	http.InitOrderRouter(r, orderHandler)

	port := fmt.Sprintf(":%d", global.Config.Server.Port)
	fmt.Printf("Order service starting on port %s\n", port)
	r.Run(port)
}
