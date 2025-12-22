package repository

import (
	"context"
	"fmt"
	"go-event-ticket-service/internal/database"
	"go-event-ticket-service/internal/tickets/domain/entity"
	"go-event-ticket-service/internal/tickets/domain/repository"
	"go-event-ticket-service/internal/tickets/infrastructure/params"
	"go-event-ticket-service/pkg/common"
)

type ticketRepository struct {
	db *database.Queries
}

// UpdateAmount implements repository.TicketRepository.
func (t *ticketRepository) UpdateAmount(ctx context.Context, entity *entity.TicketEntity) (int, error) {
	fmt.Println("So tuong total", entity.TotalQuantity)
	fmt.Println("So tuong sold", entity.SoldQuantity)
	sqlEffect, err := t.db.UpdateTicketAmount(ctx, database.UpdateTicketAmountParams{
		ID:            entity.ID,
		TotalQuantity: int32(entity.TotalQuantity),
		SoldQuantity:  int32(entity.SoldQuantity),
		Status:        database.TicketsStatus(entity.Status),
		ModifiedAt:    entity.BaseEntity.ModifiedAt,
		ModifierID:    entity.BaseEntity.ModifierID,
	})
	if err != nil {
		return 0, fmt.Errorf("update amount failed")
	}

	number, _ := sqlEffect.RowsAffected()
	if number == 0 {
		return 0, fmt.Errorf("update amount failed")
	}

	return 1, nil
}

// GetTicketsByID implements repository.TicketRepository.
func (t *ticketRepository) GetTicketsByID(ctx context.Context, id string) (*entity.TicketEntity, error) {
	ticketModel, err := t.db.GetTicketsById(ctx, id)
	if err != nil {
		return nil, err
	}

	ticketEntity := &entity.TicketEntity{
		ID:            ticketModel.ID,
		Title:         ticketModel.Title,
		Price:         ticketModel.Price,
		Status:        toEntityStatus(ticketModel.Status),
		TotalQuantity: uint64(ticketModel.TotalQuantity),
		SoldQuantity:  uint64(ticketModel.SoldQuantity),
		EventTimeID:   ticketModel.EventTimeID,
		BaseEntity: common.BaseEntity{
			CreatorID:  ticketModel.CreatorID,
			ModifierID: ticketModel.ModifierID,
			DeletorID:  ticketModel.DeletorID,
			CreatedAt:  ticketModel.CreatedAt,
			ModifiedAt: ticketModel.ModifiedAt,
			DeletedAt:  ticketModel.DeletedAt,
		},
	}
	return ticketEntity, nil
}

// GetAllTickets implements repository.TicketRepository.
func (t *ticketRepository) GetAllTickets(ctx context.Context, params *params.GetTicketsParams) ([]entity.TicketEntity, error) {
	models, err := t.db.GetTickets(ctx, database.GetTicketsParams{
		Limit:  int32(params.Limit),
		Offset: int32(params.Offset),
	})
	if err != nil {
		return nil, err
	}

	var res []entity.TicketEntity
	for _, model := range models {
		res = append(res, entity.TicketEntity{
			ID:            model.ID,
			Title:         model.Title,
			Price:         model.Price,
			Status:        toEntityStatus(model.Status),
			TotalQuantity: uint64(model.TotalQuantity),
			SoldQuantity:  uint64(model.SoldQuantity),
			EventTimeID:   model.EventTimeID,
			BaseEntity: common.BaseEntity{
				CreatorID:  model.CreatorID,
				CreatedAt:  model.CreatedAt,
				ModifierID: model.ModifierID,
				ModifiedAt: model.ModifiedAt,
				DeletorID:  model.DeletorID,
				DeletedAt:  model.DeletedAt,
			},
		})
	}
	return res, nil
}

// SoftDelete implements repository.TicketRepository.
func (t *ticketRepository) SoftDelete(ctx context.Context, params *params.DeleteTicketParams) error {
	if _, err := t.db.SoftDeleteTicket(ctx, database.SoftDeleteTicketParams{
		ID:        params.Id,
		DeletedAt: params.DeletedAt,
		DeletorID: params.DeletorID,
	}); err != nil {
		fmt.Println(err.Error())
		return err
	}
	return nil
}

// Create implements repository.TicketRepository.
func (t *ticketRepository) Create(ctx context.Context, entity *entity.TicketEntity) (*entity.TicketEntity, error) {

	params := &database.CreateTicketParams{
		ID:            entity.ID,
		Title:         entity.Title,
		Price:         entity.Price,
		TotalQuantity: int32(entity.TotalQuantity),
		SoldQuantity:  int32(entity.SoldQuantity),
		EventTimeID:   entity.EventTimeID,
		Status:        toDBStatus(entity.Status),
		CreatorID:     entity.BaseEntity.CreatorID,
		CreatedAt:     entity.BaseEntity.CreatedAt,
		ModifierID:    entity.BaseEntity.ModifierID,
		DeletorID:     entity.BaseEntity.DeletorID,
		ModifiedAt:    entity.BaseEntity.ModifiedAt,
		DeletedAt:     entity.BaseEntity.DeletedAt,
	}

	t.db.CreateTicket(ctx, *params)

	return entity, nil
}

// GetListTickets implements repository.TicketRepository.
func (t *ticketRepository) GetListTicketsByEventTimeID(ctx context.Context, params *params.GetTicketsParams) ([]entity.TicketEntity, error) {
	list, err := t.db.GetTicketsByEventTime(ctx, params.EventTimeId)
	if err != nil {
		return nil, err
	}
	var res []entity.TicketEntity
	for _, item := range list {
		res = append(res, entity.TicketEntity{
			ID:            item.ID,
			Title:         item.Title,
			Price:         item.Price,
			Status:        toEntityStatus(item.Status),
			TotalQuantity: uint64(item.TotalQuantity),
			SoldQuantity:  uint64(item.SoldQuantity),
			BaseEntity: common.BaseEntity{
				CreatorID:  item.CreatorID,
				CreatedAt:  item.CreatedAt,
				ModifierID: item.ModifierID,
				ModifiedAt: item.ModifiedAt,
				DeletorID:  item.DeletorID,
				DeletedAt:  item.DeletedAt},
		})
	}

	return res, nil
}

func NewTicketRepository(db *database.Queries) repository.TicketRepository {
	return &ticketRepository{db: db}
}

func toDBStatus(s entity.TicketStatus) database.TicketsStatus {
	switch s {
	case entity.TicketStatusSoldOut:
		return database.TicketsStatusSoldOut
	case entity.TicketStatusAvailable:
		return database.TicketsStatusAvailable
	case entity.TicketStatusInactive:
		return database.TicketsStatusInactive
	default:
		return "" // hoặc panic
	}
}

func toEntityStatus(s database.TicketsStatus) entity.TicketStatus {
	switch s {
	case database.TicketsStatusSoldOut:
		return entity.TicketStatusSoldOut
	case database.TicketsStatusAvailable:
		return entity.TicketStatusAvailable
	case database.TicketsStatusInactive:
		return entity.TicketStatusInactive
	default:
		return ""
	}
}
