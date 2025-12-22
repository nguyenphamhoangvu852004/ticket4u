package httpClient

import (
	"go-event-ticket-service/internal/eventTimes/domain/entity"
)

type EventAPIClient interface {
	GetEventByID(id string) (entity *entity.EventEntity, err error)
}
