package service

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
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

// GetTicketsByIds implements [TicketService].
func (t *ticketService) GetTicketsByIds(ctx context.Context, ids []string) ([]*dto.GetTicketByIDRes, error) {
	// var list []entity.TicketEntity

	var outputDto []*dto.GetTicketByIDRes

	for i := 0; i < len(ids); i++ {
		entity, err := t.ticketRepo.GetTicketByID(ctx, ids[i])
		if err != nil {
			return nil, response.NewAPIError(
				http.StatusInternalServerError,
				http.StatusText(http.StatusInternalServerError),
				map[string]string{"error": err.Error()})
		}
		newOutput := &dto.GetTicketByIDRes{
			ID:            entity.ID,
			Title:         entity.Title,
			Price:         entity.Price,
			Status:        string(entity.Status),
			TotalQuantity: entity.TotalQuantity,
			SoldQuantity:  entity.SoldQuantity,
			EventTimeID:   entity.EventTimeID,
			Created_at:    utils.UNIXtoTime(entity.BaseEntity.CreatedAt).String(),
			Updated_at:    utils.UNIXtoTime(entity.BaseEntity.ModifiedAt).String(),
		}
		outputDto = append(outputDto, newOutput)
	}

	return outputDto, nil
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
		ticketEntity, err := t.ticketRepo.GetTicketByID(ctx, ticket.TicketId)
		if err != nil {
			return nil, err
		}
		if ticketEntity == nil {
			return nil, response.NewAPIError(http.StatusNotFound, "ticket not found", fmt.Sprintf("TicketID %s not found", ticket.TicketId))
		}
		if !ticketEntity.IsValidQuantity(ticket.Amount) {
			return nil, response.NewAPIError(http.StatusBadRequest, "ticket is not enough", fmt.Sprintf("TicketID %s insufficient quantity", ticket.TicketId))
		}
		if ticketEntity.Status == entity.TicketStatusSoldOut {
			return nil, response.NewAPIError(http.StatusBadRequest, "ticket is sold out", fmt.Sprintf("TicketID %s is sold out", ticket.TicketId))
		}
		ticketEntity.SetQuantity(ticket.Amount)
		ticketEntity.SetStatus()
		isUpdateAmountSuccess, errr := t.ticketRepo.UpdateAmount(ctx, ticketEntity)
		if errr != nil {
			return nil, response.NewAPIError(http.StatusBadRequest,fmt.Sprintf("Update Amount TicketID %s with amount %d fail",ticket.TicketId,ticket.Amount), errr.Error())
		}
		if isUpdateAmountSuccess != 1 {
			return nil, response.NewAPIError(http.StatusBadRequest,fmt.Sprintf("Update Amount TicketID %s with amount %d fail",ticket.TicketId,ticket.Amount), errr.Error())
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
	var ticketEntity = &entity.TicketEntity{}
	var ticketKey string = fmt.Sprintf("ticket:%s", ticketId)
	// lấy trong cache cái đã
	ticket, err := utils.GetRedis(ctx, ticketKey)

	if err != nil {
		// nếu lỗi redis thì return luôn
		return nil, response.NewAPIError(
			http.StatusInternalServerError,
			http.StatusText(http.StatusInternalServerError),
			map[string]string{"error": err.Error()})
	}
	// nếu ko có value ticketKey thì call db
	if ticket == "" {
		ticketEntity, err = t.ticketRepo.GetTicketByID(ctx, ticketId)

		if err != nil || ticketEntity == nil || ticketEntity.ID == "" {
			if errors.Is(err, sql.ErrNoRows) {
				return nil, response.NewAPIError(
					http.StatusNotFound,
					"Ticket not found",
					map[string]string{"ticketId": sql.ErrNoRows.Error()})
			}
			return nil, err
		}

		// lưu vô redis
		data, _ := json.Marshal(ticketEntity)
		if err := utils.SaveRedis(ctx, ticketKey, string(data), 300); err != nil {
			return nil, response.NewAPIError(
				http.StatusNotFound,
				fmt.Sprintf("Save key %s err", ticketKey),
				map[string]string{"redis": err.Error()})
		}
	} else {
		// nếu có value thì phải lấy trong cache
		if err := json.Unmarshal([]byte(ticket), ticketEntity); err != nil {
			return nil, response.NewAPIError(
				http.StatusNotFound,
				fmt.Sprintf("error while unmarshal data"),
				map[string]string{"error": err.Error()})
		}

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
