package entity

import "go-event-ticket-service/pkg/common"

type TicketStatus string

const (
	TicketStatusSoldOut   TicketStatus = "sold_out"
	TicketStatusAvailable TicketStatus = "available"
	TicketStatusInactive  TicketStatus = "inactive"
)

type TicketEntity struct {
	ID            string
	Title         string
	Price         float64
	Status        TicketStatus
	TotalQuantity uint64
	SoldQuantity  uint64
	EventTimeID   string
	BaseEntity    common.BaseEntity
	Creator_id    string
	Modifier_id   string
	Deletor_id    string
	Created_at    int64
	Modified_at   int64
	Deleted_at    int64
}

// func NewTicketEntity(
// 	id string,
// 	title string,
// 	price float64,
// 	status TicketStatus,
// 	totalQuantity uint64,
// 	soldQuantity uint64,
// 	eventTimeID string,
// ) TicketEntity {
// 	return TicketEntity{
// 		ID:            id,
// 		Title:         title,
// 		Price:         price,
// 		Status:        status,
// 		TotalQuantity: totalQuantity,
// 		SoldQuantity:  soldQuantity,
// 		EventTimeID:   eventTimeID,
// 	}
// }

// func (t TicketEntity) SetStatus() {
// 	if t.TotalQuantity == t.SoldQuantity {
// 		t.Status = TicketStatusSoldOut
// 	} else if t.TotalQuantity == 0 {
// 		t.Status = TicketStatusInactive
// 	} else if t.TotalQuantity > t.SoldQuantity {
// 		t.Status = TicketStatusAvailable
// 	}
// }

// func (t TicketEntity) GetRestAmount() uint64 {
// 	return t.TotalQuantity - t.SoldQuantity
// }

// func (t TicketEntity) IsValidPrive() bool {
// 	return t.Price > 0
// }
