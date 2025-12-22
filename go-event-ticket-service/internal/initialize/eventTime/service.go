package initalize

import (
	"database/sql"
	"go-event-ticket-service/global"
	"go-event-ticket-service/internal/database"
	"go-event-ticket-service/internal/eventTimes/application/service"
	clientimpl "go-event-ticket-service/internal/eventTimes/infrastructure/clientImpl"
	eventTimeRepository "go-event-ticket-service/internal/eventTimes/infrastructure/repositoryImpl"
	"go-event-ticket-service/internal/eventTimes/presentation/http"
	eventRepository "go-event-ticket-service/internal/events/infrastructure/repositoryImpl"
	ticketRepository "go-event-ticket-service/internal/tickets/infrastructure/repositoryImpl"
)

func InitEventTimeService(db *database.Queries, dbRaw *sql.DB) *http.EventTimeHandler {
	//Repository
	eventTimeRepo := eventTimeRepository.NewEventTimeRepository(db)
	eventRepo := eventRepository.NewEventRepository(db, dbRaw)
	ticketRepo := ticketRepository.NewTicketRepository(db)
	eventClient := clientimpl.NewEventAPIClient(global.BaseUrl)

	//Service
	service := service.NewEventTimeService(eventTimeRepo, eventRepo, eventClient, ticketRepo)

	//Controller
	handler := http.NewEventTimeHandler(&service)

	return handler
}
