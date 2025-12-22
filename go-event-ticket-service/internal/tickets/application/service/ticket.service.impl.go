package service

import (
	"context"
	"fmt"
	evenTimeRepo "go-event-ticket-service/internal/eventTimes/domain/repository"
	"go-event-ticket-service/internal/tickets/application/dto"
	"go-event-ticket-service/internal/tickets/domain/entity"
	ticketRepo "go-event-ticket-service/internal/tickets/domain/repository"
	"go-event-ticket-service/internal/tickets/infrastructure/params"
	"go-event-ticket-service/pkg/common"
	"go-event-ticket-service/pkg/response"
	"go-event-ticket-service/utils"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
)

type ticketService struct {
	ticketRepo    ticketRepo.TicketRepository
	eventTimeRepo evenTimeRepo.EventTimeRepository
}

// GetTicketsByEventTimeId implements TicketService.
func (t *ticketService) GetTicketsByEventTimeId(ctx context.Context, reqData *dto.GetTicketsByEventTimeIdReq) (*dto.GetTicketsByEventTimeIdRes, error) {
	eventTime, err := t.eventTimeRepo.GetOne(ctx, reqData.EventTimeID)
	if err != nil || eventTime == nil {
		return nil, response.NewAPIError(http.StatusNotFound, "event time not found", err)
	}

	params := &params.GetTicketsParams{EventTimeId: eventTime.ID, Limit: 1, Offset: 0}

	tickets, err := t.ticketRepo.GetListTicketsByEventTimeID(ctx, params)
	if err != nil {
		tickets = []entity.TicketEntity{}
	}

	var listTicketResDto []dto.GetTicketByIDRes
	ticketResDto := dto.GetTicketsByEventTimeIdRes{
		EventTimeID: eventTime.EventID,
		Tickets:     []dto.GetTicketByIDRes{},
	}

	for _, ticket := range tickets {
		listTicketResDto = append(listTicketResDto, dto.GetTicketByIDRes{
			ID:            ticket.ID,
			Title:         ticket.Title,
			Price:         ticket.Price,
			Status:        fmt.Sprint(ticket.Status),
			TotalQuantity: ticket.TotalQuantity,
			SoldQuantity:  ticket.SoldQuantity,
			EventTimeID:   ticket.EventTimeID,
			Created_at:    utils.UNIXtoTime(ticket.BaseEntity.CreatedAt).String(),
			Updated_at:    utils.UNIXtoTime(ticket.BaseEntity.ModifiedAt).String(),
		})
	}
	ticketResDto.Tickets = listTicketResDto
	return &ticketResDto, nil

}

// UpdateSoldAmount implements TicketService.
func (t *ticketService) UpdateSoldAmount(ctx context.Context, reqData *dto.UpdateSoldAmountReq) (*dto.UpdateSoldAmountRes, error) {

	for _, ticket := range reqData.Tickets {
		ticketEntity, err := t.ticketRepo.GetTicketsByID(ctx, ticket.TicketId)
		if err != nil {
			return nil, err
		}
		if ticketEntity == nil {
			return nil, response.NewAPIError(http.StatusNotFound, "ticket not found", nil)
		}
		if ticketEntity.Status == entity.TicketStatusSoldOut {
			return nil, response.NewAPIError(http.StatusBadRequest, "ticket is sold out", nil)
		}
		ticketEntity.SoldQuantity += uint64(ticket.Amount)
		ticketEntity.TotalQuantity -= uint64(ticket.Amount)
		if ticketEntity.TotalQuantity == 0 {
			ticketEntity.Status = entity.TicketStatusSoldOut
		}
		isSucc, er := t.ticketRepo.UpdateAmount(ctx, ticketEntity)
		if er != nil {
			return nil, response.NewAPIError(http.StatusBadRequest, "update fail", nil)
		}
		if isSucc != 1 {
			return nil, response.NewAPIError(http.StatusBadRequest, "update fail", nil)
		}
	}
	return &dto.UpdateSoldAmountRes{
		Tickets: reqData.Tickets,
	}, nil

}

func (t *ticketService) GetAllTickets(ctx context.Context, reqData *dto.GetTicketsListReq) (*dto.GetTicketsListRes, error) {
	// default limit & offset
	const limit int64 = 10
	var offset int64 = 0

	// parse page nếu có
	if reqData.Page != "" {
		pageInt, err := strconv.ParseInt(reqData.Page, 10, 64)
		if err != nil {
			return nil, err // có thể wrap thêm lỗi cho rõ
		}
		if pageInt > 0 {
			offset = (pageInt - 1) * limit
		}
	}

	// gọi repo lấy ticket
	listTicketEntity, err := t.ticketRepo.GetAllTickets(ctx, &params.GetTicketsParams{
		Limit:  int(limit),
		Offset: int(offset),
	})
	if err != nil {
		return nil, err
	}

	// khởi tạo slice rỗng để tránh nil slice
	listTicketRes := &dto.GetTicketsListRes{
		Tickets: make([]dto.GetTicketByIDRes, 0, len(listTicketEntity)),
	}

	// map entity sang DTO
	for _, ticket := range listTicketEntity {
		listTicketRes.Tickets = append(listTicketRes.Tickets, dto.GetTicketByIDRes{
			ID:            ticket.ID,
			Title:         ticket.Title,
			Price:         ticket.Price,
			Status:        fmt.Sprint(ticket.Status),
			TotalQuantity: ticket.TotalQuantity,
			SoldQuantity:  ticket.SoldQuantity,
			EventTimeID:   ticket.EventTimeID,
			Created_at:    utils.UNIXtoTime(ticket.BaseEntity.CreatedAt).String(),
			Updated_at:    utils.UNIXtoTime(ticket.BaseEntity.ModifiedAt).String(),
		})
	}

	return listTicketRes, nil
}

// CreateTicket implements TicketService.
func (t *ticketService) CreateTicket(ctx context.Context, reqData *dto.CreateTicketReq) (*dto.CreateTicketRes, error) {
	// tìm coi cái evenTime tồn tại hay không
	rs, err := t.eventTimeRepo.IsExists(ctx, reqData.EventTimeId)
	if err != nil {
		return nil, err
	}
	if !rs {
		return nil, fmt.Errorf("eventTime not found")
	}

	// tạo entity
	priceFloat, err := strconv.ParseFloat(reqData.Price, 64)
	if err != nil {
		return nil, err
	}
	quantityInt, err := strconv.ParseInt(reqData.Quantity, 10, 64)
	if err != nil {
		return nil, err
	}
	ticketEntity := &entity.TicketEntity{
		ID:            uuid.New().String(),
		Title:         reqData.Title,
		Price:         priceFloat,
		Status:        entity.TicketStatusAvailable,
		TotalQuantity: uint64(quantityInt),
		SoldQuantity:  0,
		EventTimeID:   reqData.EventTimeId,
		BaseEntity: common.NewBaseEntity(
			reqData.CreatorId,
		),
	}

	entity, err := t.ticketRepo.Create(ctx, ticketEntity)
	if err != nil {
		return nil, err
	}

	return &dto.CreateTicketRes{
		ID: entity.ID,
	}, nil
}

// DeleteTicket implements TicketService.
func (t *ticketService) DeleteTicket(ctx context.Context, reqData *dto.DeleteTicketReq) (*dto.DeleteTicketRes, error) {
	if err := t.ticketRepo.SoftDelete(ctx, &params.DeleteTicketParams{
		Id:        reqData.ID,
		DeletorID: reqData.DeletorID,
		DeletedAt: time.Now().Unix(),
	}); err != nil {
		return nil, err
	}
	return &dto.DeleteTicketRes{
		ID:        reqData.ID,
		DeletedAt: utils.UNIXtoTime(time.Now().Unix()).String(),
	}, nil
}

// GetTicketByID implements TicketService.
func (t *ticketService) GetTicketByID(ctx context.Context, ticketId string) (*dto.GetTicketByIDRes, error) {
	ticketEntity, err := t.ticketRepo.GetTicketsByID(ctx, ticketId)
	if ticketEntity == nil {
		return nil, response.NewAPIError(http.StatusNotFound, "ticket not found", nil)
	}
	if err != nil {
		return nil, err
	}

	return &dto.GetTicketByIDRes{
		ID:            ticketEntity.ID,
		Title:         ticketEntity.Title,
		Price:         ticketEntity.Price,
		Status:        fmt.Sprint(ticketEntity.Status),
		TotalQuantity: ticketEntity.TotalQuantity,
		SoldQuantity:  ticketEntity.SoldQuantity,
		EventTimeID:   ticketEntity.EventTimeID,
		Created_at:    utils.UNIXtoTime(ticketEntity.BaseEntity.CreatedAt).String(),
		Updated_at:    utils.UNIXtoTime(ticketEntity.BaseEntity.ModifiedAt).String(),
		// BaseEntity:    ticketEntity.BaseEntity,
	}, nil
}

// func (t *ticketService) LoopReadKafkaMessage(ctx context.Context) {
// 	go func() {
// 		for {
// 			mess, err := t.kafkaConsumer.ReadMessage(ctx)
// 			if err != nil {
// 				fmt.Println("Kafka read error:", err)
// 				time.Sleep(time.Second) // tạm nghỉ 1s nếu lỗi
// 				continue
// 			}

// 			fmt.Println("Received message:", mess)
// 		}
// 	}()
// }

func NewTicketService(ticketRepo ticketRepo.TicketRepository, eventTimeRepo evenTimeRepo.EventTimeRepository) TicketService {

	ticketService := &ticketService{
		ticketRepo:    ticketRepo,
		eventTimeRepo: eventTimeRepo,
	}

	return ticketService
}
