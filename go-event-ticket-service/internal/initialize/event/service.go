package initalize

import (
	"database/sql"
	"go-event-ticket-service/internal/database"
	"go-event-ticket-service/internal/events/application/service"
	eventRepository "go-event-ticket-service/internal/events/infrastructure/repositoryImpl"
	"go-event-ticket-service/internal/events/presentation/http"
	ticketRepository "go-event-ticket-service/internal/tickets/infrastructure/repositoryImpl"
	utils "go-event-ticket-service/utils/cache"

	evenTimeRepo "go-event-ticket-service/internal/eventTimes/infrastructure/repositoryImpl"
)

func InitEventService(db *database.Queries, dbRaw *sql.DB, cacher utils.CacherInterface) *http.EventHandler {
	eventRepo := eventRepository.NewEventRepository(db, dbRaw)
	ticketRepo := ticketRepository.NewTicketRepository(db)
	eventTicketRepo := evenTimeRepo.NewEventTimeRepository(db)
	service := service.NewEventService(eventRepo, cacher, ticketRepo, eventTicketRepo)
	handler := http.NewEventHandler(&service)
	return handler
}
