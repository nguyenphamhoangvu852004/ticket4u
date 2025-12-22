package initalize

import (
	"go-event-ticket-service/internal/database"
	eventTimeRepo "go-event-ticket-service/internal/eventTimes/infrastructure/repositoryImpl"
	"go-event-ticket-service/internal/tickets/application/service"
	ticketService "go-event-ticket-service/internal/tickets/application/service"
	ticketRepo "go-event-ticket-service/internal/tickets/infrastructure/repositoryImpl"
	"go-event-ticket-service/internal/tickets/presentation/http"
)

func InitTicketService(db *database.Queries) (*http.TicketHandler, service.TicketService) {
	ticketRepo := ticketRepo.NewTicketRepository(db)
	eventTimeRepo := eventTimeRepo.NewEventTimeRepository(db)
	service := ticketService.NewTicketService(ticketRepo, eventTimeRepo)

	handler := http.NewTicketHandler(&service)
	// service.LoopReadKafkaMessage(context.Background())

	return handler, service
}
