package entity

import (
	"go-event-ticket-service/pkg/common"
)

type CategoryEntity struct {
	ID          string
	Title       string
	Description string
	Creator_id  string
	BaseEntity  common.BaseEntity
}
