package service

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	catetoryEntity "go-event-ticket-service/internal/categories/domain/entity"
	entityEventTimePackage "go-event-ticket-service/internal/eventTimes/domain/entity"
	eventTimeRepo "go-event-ticket-service/internal/eventTimes/domain/repository"
	"go-event-ticket-service/internal/events/application/dto"
	"go-event-ticket-service/internal/events/domain/entity"
	"go-event-ticket-service/internal/events/domain/repository"
	"go-event-ticket-service/internal/events/infrastructure/params"
	ticketEntity "go-event-ticket-service/internal/tickets/domain/entity"
	ticketRepo "go-event-ticket-service/internal/tickets/domain/repository"
	ticketParams "go-event-ticket-service/internal/tickets/infrastructure/params"
	"go-event-ticket-service/pkg/common"
	"go-event-ticket-service/pkg/response"
	"go-event-ticket-service/utils"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
)

type eventService struct {
	eventTimeRepo eventTimeRepo.EventTimeRepository
	eventsRepo    repository.EventRepository
	ticketsRepo   ticketRepo.TicketRepository
	// eventTimesRepo repositoryEventTimeRepository
}

// RestoreEvent implements EventService.
func (service *eventService) RestoreEvent(ctx context.Context, reqData *dto.RestoreEventReq) error {
	if err := service.eventsRepo.Restore(ctx, &params.RestoreEventParams{ID: reqData.ID}); err != nil {
		return response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
	}
	return nil
}

// GetDeletedList implements EventService.
func (service *eventService) GetDeletedList(ctx context.Context, reqData *dto.GetDeletedListReq) (resData *dto.GetDeletedListRes, err error) {
	uintPage, err := strconv.ParseUint(reqData.Page, 10, 64)
	if err != nil {
		uintPage = 1
	}
	count := 0
	var limit uint = 20

	offset := (uint(uintPage) - 1) * limit

	listEntity, err := service.eventsRepo.GetDeleted(ctx, &params.GetEventsParams{PaginateParams: params.PaginateParams{Limit: int(limit), Offset: int(offset)}})

	if err != nil {
		return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
	}

	var resDto dto.GetDeletedListRes

	for _, item := range listEntity {
		eventDto := dto.EventOutputDTO{
			ID:        item.ID,
			Title:     item.Title,
			Address:   item.Address,
			Organizer: item.OrganizerID,
			Category: dto.CategoryOutputDTO{
				ID:          item.EventCategory.ID,
				Title:       item.EventCategory.Title,
				Description: item.EventCategory.Description,
			},
			CreatedAt: utils.UNIXtoTime(item.BaseEntity.CreatedAt).String(),
		}
		resDto.List = append(resDto.List, eventDto)
		count += 1
	}
	resDto.Metadata = utils.NewPaginationMeta(count, int(uintPage), int(limit))

	return &resDto, nil
}

// DeleteEvent implements EventService.
func (service *eventService) DeleteEvent(ctx context.Context, reqData *dto.DeleteEventReq) error {

	err := service.eventsRepo.SoftDelete(ctx,
		&params.DeleteEventParams{
			ID:        reqData.ID,
			DeletedAt: time.Now().Unix(),
			DeletorID: reqData.DeletorId})

	if err != nil {
		return response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
	}

	return nil
}

// ModifyEvent implements EventService.
func (service *eventService) ModifyEvent(ctx context.Context, reqData *dto.ModifyEventReq) (resData *dto.ModifyEventRes, err error) {
	var entityUpdate entity.EventEntityUpdate

	// tim cai entity theo id
	entity, err := service.eventsRepo.GetEventByID(ctx, reqData.ID)
	if err != nil {
		return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
	}

	// update entity
	entityUpdate.ID = entity.ID
	entityUpdate.Title = reqData.Title
	entityUpdate.Address = reqData.Address
	entityUpdate.OrganizerID = reqData.OrganizerId

	entity, err = service.eventsRepo.Update(ctx, &entityUpdate)
	if err != nil {
		return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
	}

	return &dto.ModifyEventRes{ID: entityUpdate.ID}, nil
}

func (service *eventService) CreateEvent(ctx context.Context, reqData *dto.CreateEventReq) (*dto.CreateEventRes, error) {
	eventEntity := &entity.EventEntity{
		ID:          uuid.NewString(),
		Title:       reqData.Title,
		Address:     reqData.Address,
		OrganizerID: reqData.OrganizerId,
		EventCategory: catetoryEntity.CategoryEntity{
			ID: reqData.CategoryId,
		},
		BaseEntity: common.NewBaseEntity(reqData.OrganizerId),
	}

	// Insert Event trước
	if _, err := service.eventsRepo.Save(ctx, eventEntity); err != nil {
		return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
	}
	var eventTimes []entityEventTimePackage.EventTimeEntity

	for _, et := range reqData.EventTimes {
		eventTime := entityEventTimePackage.EventTimeEntity{
			ID:          uuid.NewString(),
			StartTime:   et.StartTime,
			EndTime:     et.EndTime,
			Description: et.Description,
			EventID:     eventEntity.ID,
			BaseEntity:  common.NewBaseEntity(eventEntity.OrganizerID),
		}

		if _, err := service.eventTimeRepo.Save(ctx, &eventTime); err != nil {
			return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
		}

		var tickets []ticketEntity.TicketEntity
		for _, t := range et.Tickets {
			price, err := strconv.ParseFloat(t.Price, 64)
			if err != nil {
				return nil, response.NewAPIError(http.StatusBadRequest, err.Error(), err)
			}
			qty, err := strconv.ParseUint(t.Quantity, 10, 64)
			if err != nil {
				return nil, response.NewAPIError(http.StatusBadRequest, err.Error(), err)
			}

			ticket := ticketEntity.TicketEntity{
				ID:            uuid.NewString(),
				Title:         t.Title,
				Price:         price,
				Status:        ticketEntity.TicketStatusAvailable,
				TotalQuantity: qty,
				EventTimeID:   eventTime.ID,
				BaseEntity:    common.NewBaseEntity(eventEntity.OrganizerID),
			}

			if _, err := service.ticketsRepo.Create(ctx, &ticket); err != nil {
				return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
			}
			tickets = append(tickets, ticket)
		}

		eventTime.TicketEntity = tickets
		eventTimes = append(eventTimes, eventTime)
	}

	eventEntity.EventTimes = eventTimes

	return &dto.CreateEventRes{ID: eventEntity.ID}, nil
}

// nic("unimplemented")
func (service *eventService) GetEventById(ctx context.Context, reqData *dto.GetEventByIDReq) (resData *dto.GetEventByIDRes, err error) {

	// gọi api lấy event
	eventEntity, err := service.eventsRepo.GetEventByID(ctx, reqData.ID)
	if err != nil || eventEntity == nil || eventEntity.ID == "" {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, response.NewAPIError(http.StatusNotFound, "Event not found", err)
		}
		return nil, err
	}

	// gọi api lấy tất cả eventTime theo eventId
	eventTimesEntities, err := service.eventTimeRepo.GetManyByEventId(ctx, 100, 0, eventEntity.ID)
	if err != nil {
		return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
	}
	var resDto dto.GetEventByIDRes
	resDto.Event.ID = eventEntity.ID
	resDto.Event.Title = eventEntity.Title
	resDto.Event.Address = eventEntity.Address
	resDto.Event.Organizer = eventEntity.OrganizerID
	resDto.Event.CreatedAt = utils.UNIXtoTime(eventEntity.BaseEntity.CreatedAt).String()
	resDto.Event.ModifiedAt = utils.UNIXtoTime(eventEntity.BaseEntity.ModifiedAt).String()
	resDto.Event.Category = dto.CategoryOutputDTO{
		ID:          eventEntity.EventCategory.ID,
		Title:       eventEntity.EventCategory.Title,
		Description: eventEntity.EventCategory.Description,
	}
	resDto.Event.EventTimes = nil

	if len(eventTimesEntities) != 0 {

		// gọi api lấy tất cả ticket theo eventTimeId
		ticketEntities, err := service.ticketsRepo.GetListTicketsByEventTimeID(ctx, &ticketParams.GetTicketsParams{
			EventTimeId: eventTimesEntities[0].ID,
		})
		if err != nil {
			return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
		}

		// duyệt event time
		for _, et := range eventTimesEntities {
			var etDto dto.EventTimeOutputDTO
			etDto.ID = et.ID
			etDto.StartTime = et.StartTime
			etDto.EndTime = et.EndTime
			etDto.Description = et.Description
			etDto.Tickets = nil
			// duyệt ticket theo event time đó

			for _, t := range ticketEntities {
				var tDto dto.TicketOutputDTO
				tDto.ID = t.ID
				tDto.Title = t.Title

				tDto.Price = fmt.Sprintf("%.2f", t.Price)
				tDto.Status = string(t.Status)
				tDto.Quantity = strconv.FormatUint(t.TotalQuantity, 10)
				etDto.Tickets = append(etDto.Tickets, &tDto)
			}

			resDto.Event.EventTimes = append(resDto.Event.EventTimes, &etDto)

		}
	}

	return &resDto, nil
}

// GetEventsList implements EventService.
func (service *eventService) GetEventsList(ctx context.Context, reqData *dto.GetEventsListReq) (*dto.GetEventsListRes, error) {

	// parse page
	uintPage, err := strconv.ParseUint(reqData.Page, 10, 64)
	if err != nil || uintPage == 0 {
		uintPage = 1
	}
	uintSize := uint64(20)
	offset := (uintPage - 1) * uintSize

	cacheKey := fmt.Sprintf("events:page:%d:size:%d", uintPage, uintSize)

	// 1. Try Redis
	cached, err := utils.GetRedis(ctx, cacheKey)
	if err == nil && cached != "" {
		var cachedRes dto.GetEventsListRes
		if err := json.Unmarshal([]byte(cached), &cachedRes); err == nil {
			return &cachedRes, nil
		}
	}

	// 2. Query MySQL
	params := &params.GetEventsParams{
		PaginateParams: params.PaginateParams{
			Limit:  int(uintSize),
			Offset: int(offset),
		},
	}

	fmt.Println("limit", params.Limit)
	fmt.Println("offset", params.Offset)

	listEntity, err := service.eventsRepo.Get(ctx, params)
	if err != nil {
		return nil, err
	}

	// build DTO
	var resDto dto.GetEventsListRes
	resDto.List = make([]dto.EventOutputDTO, 0, len(listEntity))

	for _, item := range listEntity {
		eventDto := dto.EventOutputDTO{
			ID:        item.ID,
			Title:     item.Title,
			Address:   item.Address,
			Organizer: item.OrganizerID,
			Category: dto.CategoryOutputDTO{
				ID:          item.EventCategory.ID,
				Title:       item.EventCategory.Title,
				Description: item.EventCategory.Description,
			},
			CreatedAt:  utils.UNIXtoTime(item.BaseEntity.CreatedAt).String(),
			ModifiedAt: utils.UNIXtoTime(item.BaseEntity.ModifiedAt).String(),
		}

		resDto.List = append(resDto.List, eventDto)
	}

	totalItems, err := service.eventsRepo.Count(ctx)
	if err != nil {
		return nil, err
	}
	fmt.Println(totalItems)

	resDto.Metadata = utils.NewPaginationMeta(
		int(totalItems),
		int(uintPage),
		int(uintSize),
	)

	// 3. Save to Redis cache
	serialized, _ := json.Marshal(resDto)
	err = utils.SaveRedis(ctx, cacheKey, string(serialized), 60*5) // TTL 5 minutes
	if err != nil {
		return nil, err
	}

	return &resDto, nil
}

func (s *eventService) Exists(ctx context.Context, id string) (bool, error) {
	entity, err := s.eventsRepo.GetEventByID(ctx, id)
	if err != nil {
		return false, err
	}
	if entity == nil {
		return false, err
	}
	return true, nil
}

func NewEventSerivce(eventRepo repository.EventRepository, ticketRepo ticketRepo.TicketRepository, eventTimeRepo eventTimeRepo.EventTimeRepository) EventService {
	return &eventService{
		eventsRepo:    eventRepo,
		ticketsRepo:   ticketRepo,
		eventTimeRepo: eventTimeRepo,
	}
}
