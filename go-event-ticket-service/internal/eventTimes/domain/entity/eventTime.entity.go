package entity

import (
	"go-event-ticket-service/internal/tickets/domain/entity"
	"go-event-ticket-service/pkg/common"
)

type EventTimeEntity struct {
	ID           string
	StartTime    string
	EndTime      string
	Description  string
	EventID      string
	TicketEntity []entity.TicketEntity
	BaseEntity   common.BaseEntity
}
