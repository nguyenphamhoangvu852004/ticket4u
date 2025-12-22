package service

import (
	"context"
	"encoding/json"
	"fmt"
	"go-event-ticket-service/global"
	"go-event-ticket-service/internal/eventTimes/application/dto"
	httpClient "go-event-ticket-service/internal/eventTimes/domain/apiClient"
	"go-event-ticket-service/internal/eventTimes/domain/entity"
	"go-event-ticket-service/internal/eventTimes/domain/repository"
	eventTimeRepo "go-event-ticket-service/internal/eventTimes/domain/repository"
	eventTimeParams "go-event-ticket-service/internal/eventTimes/infrastructure/params"
	eventRepo "go-event-ticket-service/internal/events/domain/repository"
	ticketRepo "go-event-ticket-service/internal/tickets/domain/repository"
	ticketParams "go-event-ticket-service/internal/tickets/infrastructure/params"
	"go-event-ticket-service/pkg/common"
	"go-event-ticket-service/pkg/response"
	"go-event-ticket-service/utils"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/google/uuid"
)

type eventTimeService struct {
	eventRepo      eventRepo.EventRepository
	eventTimeRepo  eventTimeRepo.EventTimeRepository
	ticketRepo     ticketRepo.TicketRepository
	eventApiClient httpClient.EventAPIClient
}

// GetEventTimeById implements EventTimeService.
func (e *eventTimeService) GetEventTimeById(ctx context.Context, reqData *dto.GetEventTimeByIdReq) (resData *dto.GetEventTimeByIdRes, err error) {

	evenTimeEntity, err := e.eventTimeRepo.GetOne(ctx, reqData.ID)

	if err != nil {
		return nil, err
	}

	return &dto.GetEventTimeByIdRes{
		ID:        evenTimeEntity.ID,
		EventId:   evenTimeEntity.EventID,
		StartTime: evenTimeEntity.StartTime,
		EndTime:   evenTimeEntity.EndTime,
		CreatedAt: fmt.Sprint(utils.UNIXtoTime(evenTimeEntity.BaseEntity.CreatedAt)),
	}, nil
}

// GetEventTimes implements EventTimeService.
func (e *eventTimeService) GetEventTimes(ctx context.Context, reqData *dto.GetEventTimesReq) (resData *dto.GetEventTimesRes, err error) {
	panic("unimplemented")
}

// GetEventTimesByEventId implements EventTimeService.
func (e *eventTimeService) GetEventTimesByEventId(ctx context.Context, reqData *dto.GetEventTimeByEventIdReq) (resData *dto.GetEventTimeByEventIdRes, err error) {
	panic("unimplemented")
}

// SoftDeleteEventTime implements EventTimeService.
func (e *eventTimeService) SoftDeleteEventTime(ctx context.Context, reqData *dto.SoftDeleteEventTimeReq) (resData *dto.SoftDeleteEventTimeRes, err error) {
	// xoá mềm luôn cả ticket của eventTime đó luôn

	// tìm eventTime
	eventTime, err := e.eventTimeRepo.GetOne(ctx, reqData.EventTimeId)
	if err != nil {
		return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
	}
	if eventTime.BaseEntity.DeletedAt != 0 {
		return nil, response.NewAPIError(http.StatusBadRequest, "this event is deleted before", err)
	}

	//xoá mềm cái eventtime
	if err := e.eventTimeRepo.SoftDeleteOne(ctx, eventTimeParams.DeleteEventTimeParams{
		ID:        reqData.EventTimeId,
		DeletedAt: time.Now().Unix(),
		DeletorID: reqData.DeletorId,
	}); err != nil {
		return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
	}

	// xoá mềm tất cả cä ticket của eventTime
	if err := e.ticketRepo.SoftDelete(ctx, &ticketParams.DeleteTicketParams{
		Id:        eventTime.ID,
		DeletorID: reqData.DeletorId,
		DeletedAt: time.Now().Unix(),
	}); err != nil {
		return nil, response.NewAPIError(http.StatusInternalServerError, err.Error(), err)
	}

	return &dto.SoftDeleteEventTimeRes{
		EventTimeId: eventTime.ID,
		DeletedAt:   time.Now().Unix(),
	}, nil

}

// UpdateEventTime implements EventTimeService.
func (e *eventTimeService) UpdateEventTime(ctx context.Context, reqData *dto.UpdateEventTimeReq) (resData *dto.UpdateEventTimeReq, err error) {
	panic("unimplemented")
}

type EventResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    struct {
		Event Event `json:"event"`
	} `json:"data"`
}

type Event struct {
	ID        string   `json:"id"`
	Title     string   `json:"title"`
	Address   string   `json:"address"`
	Organizer string   `json:"organizer"`
	Category  Category `json:"category"`
	CreatedAt string   `json:"createdAt"`
}

type Category struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

// CreateEventTime implements EventTimeService.
func (e *eventTimeService) CreateEventTime(ctx context.Context, reqData *dto.CreateEventTimeReq) (resData *dto.CreateEventTimeRes, err error) {
	// Tìm coi có eventId tồn tại trong bảng hay chưa
	// Nếu chưa tìm thấy thi tìm kế tiếp trong bảng event
	// rs, err := e.eventRepo.IsExists(ctx, reqData.EventId)
	// if err != nil {
	// 	return nil, err
	// }
	// if !rs {
	// 	return nil, err
	// }
	resp, err := http.Get(global.BaseUrl + "/events/" + reqData.EventId)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var res EventResponse

	if err := json.Unmarshal(body, &res); err != nil {
		return nil, err
	}

	if res.Code != 200 {
		return nil, err
	}

	// //tạo eventTime
	entity, err := e.eventTimeRepo.Save(ctx, &entity.EventTimeEntity{
		ID:          uuid.NewString(),
		EventID:     reqData.EventId,
		StartTime:   reqData.StartTime,
		EndTime:     reqData.EndTime,
		Description: reqData.Description,
		BaseEntity:  common.NewBaseEntity(reqData.CreatorId),
	})
	if err != nil {
		return nil, err
	}

	// mapping
	return &dto.CreateEventTimeRes{
		ID:        entity.ID,
		CreatedAt: utils.UNIXtoTime(entity.BaseEntity.CreatedAt).String(),
	}, nil
}

func NewEventTimeService(eventTimeRepo repository.EventTimeRepository, eventRepo eventRepo.EventRepository, eventApiClient httpClient.EventAPIClient, ticketRepo ticketRepo.TicketRepository) EventTimeService {
	return &eventTimeService{
		eventTimeRepo:  eventTimeRepo,
		eventRepo:      eventRepo,
		eventApiClient: eventApiClient,
		ticketRepo:     ticketRepo,
	}
}
