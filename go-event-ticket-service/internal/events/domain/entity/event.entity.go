package entity

import (
	catetoryEntity "go-event-ticket-service/internal/categories/domain/entity"
	eventTimeEntity "go-event-ticket-service/internal/eventTimes/domain/entity"
	"go-event-ticket-service/pkg/common"
)

type EventEntity struct {
	ID            string
	Title         string
	Address       string
	OrganizerID   string
	EventCategory catetoryEntity.CategoryEntity
	EventTimeIDs  []string
	EventTimes    []eventTimeEntity.EventTimeEntity
	BaseEntity    common.BaseEntity
}

type EventEntityUpdate struct {
	ID            string
	Title         *string
	Address       *string
	OrganizerID   *string
	EventCategory *catetoryEntity.CategoryEntity
	EventTimes    *[]eventTimeEntity.EventTimeEntity
	BaseEntity    common.BaseEntity
}
