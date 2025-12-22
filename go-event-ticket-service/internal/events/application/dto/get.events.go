package dto

import (
	"go-event-ticket-service/internal/common"
)

type CategoryOutputDTO struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type TicketOutputDTO struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Price    string `json:"price"`
	Status   string `json:"status"`
	Quantity string `json:"quantity"`
}

type EventTimeOutputDTO struct {
	ID          string             `json:"id"`
	StartTime   string             `json:"startTime"`
	EndTime     string             `json:"endTime"`
	Description string             `json:"description"`
	Tickets     []*TicketOutputDTO `json:"tickets,omitempty"`
}

type EventOutputDTO struct {
	ID         string                `json:"id"`
	Title      string                `json:"title"`
	Address    string                `json:"address"`
	Organizer  string                `json:"organizer"`
	Category   CategoryOutputDTO     `json:"category"`
	EventTimes []*EventTimeOutputDTO `json:"eventTimes,omitempty"`
	CreatedAt  string                `json:"createdAt"`
	ModifiedAt string                `json:"modifiedAt"`
}

type (
	GetEventsListReq struct {
		Page string
		// Size string
	}

	GetEventsListRes struct {
		List     []EventOutputDTO     `json:"list"`
		Metadata common.PaginationRes `json:"metadata"`
	}
)

type (
	GetEventByIDReq struct {
		ID string `json:"id"`
	}

	GetEventByIDRes struct {
		Event EventOutputDTO `json:"event"`
	}
)

type (
	GetDeletedListReq struct {
		Page string `json:"page"`
	}
	GetDeletedListRes struct {
		List     []EventOutputDTO     `json:"list"`
		Metadata common.PaginationRes `json:"metadata"`
	}
)
