package repository

import (
	"context"
	"go-event-ticket-service/internal/events/domain/entity"
	"go-event-ticket-service/internal/events/infrastructure/params"
)

type EventRepository interface {
	// Get
	GetByCategoryId(ctx context.Context, params *params.GetEventsByCategoryIdParams) ([]entity.EventEntity, error)
	Get(ctx context.Context, params *params.GetEventsParams) ([]entity.EventEntity, error)
	GetManyByOrganizerId(ctx context.Context, params *params.GetEventsByOrganizerIdParams) ([]entity.EventEntity, error)
	GetDeleted(ctx context.Context, params *params.GetEventsParams) ([]entity.EventEntity, error)
	GetEventByID(ctx context.Context, id string) (*entity.EventEntity, error)

	// Save
	Save(ctx context.Context, entity *entity.EventEntity) (*entity.EventEntity, error)

	// Modify
	Update(ctx context.Context, entity *entity.EventEntityUpdate) (*entity.EventEntity, error)

	// Delete and restore
	SoftDelete(ctx context.Context, params *params.DeleteEventParams) error
	Restore(ctx context.Context, params *params.RestoreEventParams) error
	IsExists(ctx context.Context, id string) (bool, error)
	Count(ctx context.Context) (int64, error)
}
