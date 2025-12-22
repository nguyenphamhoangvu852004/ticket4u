package repository

import (
	"context"
	"go-event-ticket-service/internal/tickets/domain/entity"
	"go-event-ticket-service/internal/tickets/infrastructure/params"
)

type TicketRepository interface {

	// // Get
	// GetByCategoryId(ctx context.Context, params *params.GetEventsByCategoryIdParams) ([]entity.EventEntity, error)
	// Get(ctx context.Context, params *params.GetEventsParams) ([]entity.EventEntity, error)
	// GetDeleted(ctx context.Context, params *params.GetEventsParams) ([]entity.EventEntity, error)
	// GetEventByID(ctx context.Context, id string) (*entity.EventEntity, error)
	GetAllTickets(ctx context.Context, params *params.GetTicketsParams) ([]entity.TicketEntity, error)
	GetListTicketsByEventTimeID(ctx context.Context, params *params.GetTicketsParams) ([]entity.TicketEntity, error)
	GetTicketsByID(ctx context.Context, id string) (*entity.TicketEntity, error)
	// Create
	Create(ctx context.Context, entity *entity.TicketEntity) (*entity.TicketEntity, error)

	// // Modify
	// Update(ctx context.Context, entity *entity.EventEntityUpdate) (*entity.EventEntity, error)
	UpdateAmount(ctx context.Context, entity *entity.TicketEntity) (int, error)
	// Delete and restore
	SoftDelete(ctx context.Context, params *params.DeleteTicketParams) error
	// Restore(ctx context.Context, params *params.RestoreEventParams) error
}
