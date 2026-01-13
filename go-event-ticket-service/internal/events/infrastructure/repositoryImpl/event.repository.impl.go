package repository

import (
	"context"
	"database/sql"
	"fmt"
	"go-event-ticket-service/internal/database"
	"go-event-ticket-service/internal/events/domain/entity"
	"go-event-ticket-service/internal/events/domain/repository"

	catetoryEntity "go-event-ticket-service/internal/categories/domain/entity"
	"go-event-ticket-service/internal/events/infrastructure/params"
	"go-event-ticket-service/pkg/common"
	"strings"
)

type eventRepository struct {
	db    *database.Queries
	dbRaw *sql.DB
}

// Count implements repository.EventRepository.
func (e *eventRepository) Count(ctx context.Context) (int64, error) {
	number, err := e.db.Count(ctx)
	if err != nil {
		return 0, err
	}
	return number, nil
}

// IsExists implements repository.EventRepository.
func (e *eventRepository) IsExists(ctx context.Context, id string) (bool, error) {
	rs, err := e.db.GetEventById(ctx, id)
	if err != nil {
		return false, err
	}
	if rs.ID == "" {
		return false, nil
	}
	return true, nil
}

// GetDeleted implements repository.EventRepository.
func (e *eventRepository) GetDeleted(ctx context.Context, params *params.GetEventsParams) ([]entity.EventEntity, error) {
	var items []entity.EventEntity

	modelEvents, err := e.db.GetDeletedEvents(ctx, database.GetDeletedEventsParams{Limit: int32(params.Limit), Offset: int32(params.Offset)})
	if err != nil {
		return nil, err
	}

	for _, modelEvent := range modelEvents {
		items = append(items, entity.EventEntity{
			ID:          modelEvent.ID,
			Title:       modelEvent.Title,
			Address:     modelEvent.Address,
			OrganizerID: modelEvent.OrganizerID,
			EventCategory: catetoryEntity.CategoryEntity{
				ID:          modelEvent.EventCategoryID,
				Title:       modelEvent.EventCategoryTitle,
				Description: modelEvent.EventCategoryDescription.String,
			},
			BaseEntity: common.BaseEntity{
				CreatorID:  modelEvent.CreatorID,
				ModifierID: modelEvent.ModifierID,
				DeletorID:  modelEvent.DeletorID,
				CreatedAt:  modelEvent.CreatedAt,
				ModifiedAt: modelEvent.ModifiedAt,
				DeletedAt:  modelEvent.DeletedAt,
			},
		})
	}

	return items, nil
}

// GetByCategoryId implements repository.EventRepository.
func (e *eventRepository) GetByCategoryId(ctx context.Context, params *params.GetEventsByCategoryIdParams) ([]entity.EventEntity, error) {
	var items []entity.EventEntity

	modelEvents, err := e.db.GetEventsByCategoryId(ctx, database.GetEventsByCategoryIdParams{EventCategoryID: params.CategoryId, Limit: int32(params.Limit), Offset: int32(params.Offset)})
	if err != nil {
		return nil, err
	}

	for _, modelEvent := range modelEvents {
		items = append(items, entity.EventEntity{
			ID:          modelEvent.ID,
			Title:       modelEvent.Title,
			Address:     modelEvent.Address,
			OrganizerID: modelEvent.OrganizerID,
			EventCategory: catetoryEntity.CategoryEntity{ID: modelEvent.EventCategoryID,
				Title:       modelEvent.EventCategoryTitle,
				Description: modelEvent.EventCategoryDescription.String},
			EventTimes: nil,
		})
	}
	return items, nil
}

// Restore implements repository.EventRepository.
func (e *eventRepository) Restore(ctx context.Context, params *params.RestoreEventParams) error {
	err := e.db.RestoreEvent(ctx, params.ID)
	if err != nil {
		return err
	}
	return nil
}

// SoftDelete implements repository.EventRepository.
func (e *eventRepository) SoftDelete(ctx context.Context, params *params.DeleteEventParams) error {
	err := e.db.SoftDeleteEvent(ctx, database.SoftDeleteEventParams{ID: params.ID, DeletedAt: params.DeletedAt, DeletorID: params.DeletorID})
	if err != nil {
		return err
	}
	return nil
}

// GetEventByID implements repository.EventRepository.
func (e *eventRepository) GetEventByID(ctx context.Context, id string) (*entity.EventEntity, error) {
	rs, err := e.db.GetEventById(ctx, id)
	if err != nil {
		return nil, err
	}
	if rs.ID == "" {
		return nil, sql.ErrNoRows
	}

	entity := &entity.EventEntity{
		ID:          rs.ID,
		Title:       rs.Title,
		Address:     rs.Address,
		OrganizerID: rs.OrganizerID,
		EventCategory: catetoryEntity.CategoryEntity{
			ID:          rs.EventCategoryID,
			Title:       rs.EventCategoryTitle,
			Description: rs.EventCategoryDescription.String,
		},
		BaseEntity: common.BaseEntity{
			CreatorID:  rs.CreatorID,
			ModifierID: rs.ModifierID,
			DeletorID:  rs.DeletorID,
			CreatedAt:  rs.CreatedAt,
			ModifiedAt: rs.ModifiedAt,
			DeletedAt:  rs.DeletedAt,
		},
		// EventTimes:  eventTimes,
	}

	return entity, nil
}

// Update implements repository.EventRepository.
func (e *eventRepository) Update(ctx context.Context, entity *entity.EventEntityUpdate) (*entity.EventEntity, error) {
	var sets []string
	var args []interface{}

	if entity.Title != nil {
		sets = append(sets, "title = ?")
		args = append(args, *entity.Title)
	}
	if entity.Address != nil {
		sets = append(sets, "address = ?")
		args = append(args, *entity.Address)
	}
	if entity.OrganizerID != nil {
		sets = append(sets, "organizer_id = ?")
		args = append(args, *entity.OrganizerID)
	}
	if entity.EventCategory != nil {
		sets = append(sets, "event_category_id = ?")
		args = append(args, *&entity.EventCategory.ID)
	}

	if len(sets) == 0 {
		return nil, nil
	}

	sets = append(sets, "modified_at = NOW()")

	query := fmt.Sprintf(`UPDATE events SET %s WHERE id = ?`, strings.Join(sets, ", "))
	args = append(args, entity.ID)

	_, err := e.dbRaw.ExecContext(ctx, query, args...)
	return nil, err
}

// Save implements repository.EventRepository.
func (e *eventRepository) Save(ctx context.Context, entity *entity.EventEntity) (*entity.EventEntity, error) {
	var params = database.CreateEventsParams{
		ID:              entity.ID,
		Title:           entity.Title,
		Address:         entity.Address,
		OrganizerID:     entity.OrganizerID,
		EventCategoryID: entity.EventCategory.ID,
		CreatorID:       entity.BaseEntity.CreatorID,
		ModifierID:      entity.BaseEntity.ModifierID,
		DeletorID:       entity.BaseEntity.DeletorID,
		CreatedAt:       entity.BaseEntity.CreatedAt,
		ModifiedAt:      entity.BaseEntity.ModifiedAt,
		DeletedAt:       entity.BaseEntity.DeletedAt,
	}
	_, err := e.db.CreateEvents(ctx, params)
	if err != nil {
		return nil, err
	}
	return entity, nil
}

// Get implements repository.EventRepository.
func (e *eventRepository) Get(ctx context.Context, params *params.GetEventsParams) ([]entity.EventEntity, error) {
	var items []entity.EventEntity

	modelEvents, err := e.db.GetEvents(ctx, database.GetEventsParams{Limit: int32(params.Limit), Offset: int32(params.Offset)})
	if err != nil {
		return nil, err
	}

	for _, modelEvent := range modelEvents {
		items = append(items, entity.EventEntity{
			ID:          modelEvent.ID,
			Title:       modelEvent.Title,
			Address:     modelEvent.Address,
			OrganizerID: modelEvent.OrganizerID,
			EventCategory: catetoryEntity.CategoryEntity{
				ID:          modelEvent.EventCategoryID,
				Title:       modelEvent.EventCategoryTitle,
				Description: modelEvent.EventCategoryDescription.String,
			},
			BaseEntity: common.BaseEntity{
				CreatorID:  modelEvent.CreatorID,
				ModifierID: modelEvent.ModifierID,
				DeletorID:  modelEvent.DeletorID,
				CreatedAt:  modelEvent.CreatedAt,
				ModifiedAt: modelEvent.ModifiedAt,
				DeletedAt:  modelEvent.DeletedAt,
			},
		})
	}

	return items, nil
}

func NewEventRepository(db *database.Queries, dbRaw *sql.DB) repository.EventRepository {
	return &eventRepository{db: db, dbRaw: dbRaw}
}
