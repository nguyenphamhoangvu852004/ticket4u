package repository

import (
	"context"
	"database/sql"
	"fmt"
	"go-event-ticket-service/internal/database"
	"go-event-ticket-service/internal/eventTimes/domain/entity"
	"go-event-ticket-service/internal/eventTimes/domain/repository"
	"go-event-ticket-service/internal/eventTimes/infrastructure/params"
	"go-event-ticket-service/pkg/common"
	"go-event-ticket-service/utils"
	"log"
	"time"
)

type eventTimeRepository struct {
	db *database.Queries
}

// IsExists implements repository.EventTimeRepository.
func (e *eventTimeRepository) IsExists(ctx context.Context, id string) (bool, error) {
	modle, err := e.db.GetEventTimeById(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println(err.Error())

			return false, nil
		}
		return false, err
	}

	if modle.ID == "" {

		return false, nil
	}

	fmt.Println(err.Error())
	return true, nil

}

// GetManyByEventId implements repository.EventTimeRepository.
func (e *eventTimeRepository) GetManyByEventId(ctx context.Context, limit int, offset int, eventId string) ([]entity.EventTimeEntity, error) {
	models, err := e.db.GetEventTimesByEventId(ctx, database.GetEventTimesByEventIdParams{
		EventID: eventId,
		Limit:   int32(limit),
		Offset:  int32(offset),
	})
	if err != nil {
		return nil, err
	}
	var items []entity.EventTimeEntity
	for _, model := range models {
		items = append(items, entity.EventTimeEntity{
			ID:          model.ID,
			EventID:     model.EventID,
			StartTime:   utils.UNIXtoTime(model.StartTime).String(),
			EndTime:     utils.UNIXtoTime(model.EndTime).String(),
			Description: model.Description.String,
			BaseEntity: common.BaseEntity{
				CreatorID:  model.CreatorID,
				ModifierID: model.ModifierID,
				DeletorID:  model.DeletorID,
				CreatedAt:  model.CreatedAt,
				ModifiedAt: model.ModifiedAt,
				DeletedAt:  model.DeletedAt,
			},
		})
	}

	return items, nil
}

// Delete implements repository.EventTimeRepository.
func (e *eventTimeRepository) SoftDeleteOne(ctx context.Context, params params.DeleteEventTimeParams) error {
	_, err := e.db.SoftDeleteEventTime(ctx, database.SoftDeleteEventTimeParams{
		ID:        params.ID,
		DeletedAt: params.DeletedAt,
		DeletorID: params.DeletorID,
	})
	if err != nil {
		fmt.Println(err.Error())
		return err
	}
	return nil

}

// GetMany implements repository.EventTimeRepository.
func (e *eventTimeRepository) GetMany(ctx context.Context, limit int, offset int) ([]entity.EventTimeEntity, error) {
	_, err := e.db.GetEventTimes(ctx, database.GetEventTimesParams{
		Limit:  int32(limit),
		Offset: int32(offset),
	})
	if err != nil {
		return nil, err
	}

	//mapping

	// return
	return nil, nil
}

// GetOne implements repository.EventTimeRepository.
func (e *eventTimeRepository) GetOne(ctx context.Context, id string) (*entity.EventTimeEntity, error) {

	model, err := e.db.GetEventTimeById(ctx, id)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	//mapping
	eventTimeEntity := &entity.EventTimeEntity{
		ID:          model.ID,
		EventID:     model.EventID,
		StartTime:   utils.UNIXtoTime(model.StartTime).String(),
		EndTime:     utils.UNIXtoTime(model.EndTime).String(),
		Description: model.Description.String,
		BaseEntity: common.BaseEntity{
			CreatorID:  model.CreatorID,
			ModifierID: model.ModifierID,
			DeletorID:  model.DeletorID,
			CreatedAt:  model.CreatedAt,
			ModifiedAt: model.ModifiedAt,
			DeletedAt:  model.DeletedAt,
		},
	}
	//return
	return eventTimeEntity, nil

}

// Save implements repository.EventTimeRepository.
func (e *eventTimeRepository) Save(ctx context.Context, entity *entity.EventTimeEntity) (*entity.EventTimeEntity, error) {
	startTimeTime, _ := time.Parse(time.RFC3339, entity.StartTime)
	endTimeTime, _ := time.Parse(time.RFC3339, entity.EndTime)

	startTimeUnix := startTimeTime.Unix()
	endTimeUnix := endTimeTime.Unix()

	params := &database.CreateEventTimeParams{
		ID:        entity.ID,
		StartTime: startTimeUnix,
		EndTime:   endTimeUnix,
		Description: sql.NullString{
			String: entity.Description,
			Valid:  true,
		},
		EventID:    entity.EventID,
		CreatorID:  entity.BaseEntity.CreatorID,
		ModifierID: entity.BaseEntity.ModifierID,
		DeletorID:  entity.BaseEntity.DeletorID,
		CreatedAt:  entity.BaseEntity.CreatedAt,
		ModifiedAt: entity.BaseEntity.ModifiedAt,
		DeletedAt:  entity.BaseEntity.DeletedAt,
	}

	_, err := e.db.CreateEventTime(ctx, *params)

	if err != nil {
		return nil, err
	}

	return entity, nil
}

func NewEventTimeRepository(db *database.Queries) repository.EventTimeRepository {
	return &eventTimeRepository{db: db}
}
