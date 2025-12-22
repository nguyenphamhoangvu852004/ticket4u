package initalize

import (
	"database/sql"
	"go-event-ticket-service/internal/database"
	"go-event-ticket-service/internal/events/application/service" 
	eventRepository "go-event-ticket-service/internal/events/infrastructure/repositoryImpl"
	ticketRepository "go-event-ticket-service/internal/tickets/infrastructure/repositoryImpl"
	"go-event-ticket-service/internal/events/presentation/http"

	evenTimeRepo "go-event-ticket-service/internal/eventTimes/infrastructure/repositoryImpl"
)

func InitEventService(db *database.Queries, dbRaw *sql.DB) *http.EventHandler {
	evetnRepo := eventRepository.NewEventRepository(db, dbRaw)
	ticketRepo := ticketRepository.NewTicketRepository(db)
	eventTicketRepo := evenTimeRepo.NewEventTimeRepository(db)
	service := service.NewEventSerivce(evetnRepo, ticketRepo,eventTicketRepo)
	handler := http.NewEventHandler(&service)
	return handler
}
