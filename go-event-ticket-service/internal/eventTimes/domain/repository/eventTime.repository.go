package repository

import (
	"context"
	"go-event-ticket-service/internal/eventTimes/domain/entity"
	"go-event-ticket-service/internal/eventTimes/infrastructure/params"
)

type EventTimeRepository interface {
	Save(ctx context.Context, entity *entity.EventTimeEntity) (*entity.EventTimeEntity, error)
	GetMany(ctx context.Context, limit int, offset int) ([]entity.EventTimeEntity, error)
	GetManyByEventId(ctx context.Context, limit int, offset int, eventId string) ([]entity.EventTimeEntity, error)
	GetOne(ctx context.Context, id string) (*entity.EventTimeEntity, error)
	SoftDeleteOne(ctx context.Context, params params.DeleteEventTimeParams) error
	IsExists(ctx context.Context, id string) (bool, error)
}
