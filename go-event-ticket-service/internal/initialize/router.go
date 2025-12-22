package initialize

import (
	"database/sql"
	"go-event-ticket-service/global"
	"go-event-ticket-service/pkg/response"

	categoryRoutes "go-event-ticket-service/internal/categories/presentation/http"
	"go-event-ticket-service/internal/database"
	eventTimeRoutes "go-event-ticket-service/internal/eventTimes/presentation/http"
	eventRoutes "go-event-ticket-service/internal/events/presentation/http"
	initalizeCategoryService "go-event-ticket-service/internal/initialize/category"
	initalizeEventService "go-event-ticket-service/internal/initialize/event"
	initalizeEventTimeService "go-event-ticket-service/internal/initialize/eventTime"
	initalizeTicketService "go-event-ticket-service/internal/initialize/ticket"
	"go-event-ticket-service/internal/kafka"
	"go-event-ticket-service/internal/middleware"
	ticketRoutes "go-event-ticket-service/internal/tickets/presentation/http"

	"github.com/gin-gonic/gin"
)

func InitRouter(db *database.Queries, dbRaw *sql.DB) *gin.Engine {

	if global.Config.Server.Mode == "dev" {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.Default()

	// cors middleware config
	r.Use(middleware.CORSMiddleware())

	r.GET("/ping", func(ctx *gin.Context) {
		response.SuccessResponse(ctx, "pong")

	})

	// prefix route
	v1 := r.Group("/api/v1/2025")

	//Category managements
	categoryHandler := initalizeCategoryService.InitCategoryService(db, dbRaw)
	categoryRoutes.RegisterCategoryRoutes(v1, categoryHandler)

	//Event managements
	eventHandler := initalizeEventService.InitEventService(db, dbRaw)
	eventRoutes.RegisterEventRoutes(v1, eventHandler)

	//Event time managements
	eventTimeHandler := initalizeEventTimeService.InitEventTimeService(db, dbRaw)
	eventTimeRoutes.RegisterEventTimeRoutes(v1, eventTimeHandler)

	//Ticket managements
	ticketHandler, ticketService := initalizeTicketService.InitTicketService(db)
	ticketRoutes.RegisterTicketRoutes(v1, ticketHandler)

	//Kafka
	orderEventHandler := kafka.NewOrderEventHandler(ticketService)
	kafka.NewOrderConsumer(global.KafkaConsumer, *orderEventHandler)

	return r
}
