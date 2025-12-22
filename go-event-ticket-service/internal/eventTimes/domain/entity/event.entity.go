package entity

import (
	"go-event-ticket-service/internal/categories/domain/entity"
	"go-event-ticket-service/pkg/common"
)

type EventEntity struct {
	ID            string
	Title         string
	Address       string
	OrganizerID   string
	EventCategory entity.CategoryEntity
	EventTimes    []EventTimeEntity
	BaseEntity    common.BaseEntity
}
