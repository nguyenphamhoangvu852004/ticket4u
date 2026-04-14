package entity

import (
	"fmt"
	"go-event-ticket-service/pkg/common"
)

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

func (t *TicketEntity) IsValidQuantity(quantityWantToBuy int) bool {
	if t.TotalQuantity < uint64(quantityWantToBuy) {
		return false
	}
	return true
}

func (t *TicketEntity) SetStatus(){
	if t.TotalQuantity == 0 {
		t.Status= TicketStatusSoldOut
	}
	if t.TotalQuantity > 0 {
		t.Status= TicketStatusAvailable
	}
}
func (t *TicketEntity) SetQuantity(quantity int){
	t.SoldQuantity += uint64(quantity)
	t.TotalQuantity -= uint64(quantity)
}

func (t *TicketEntity) ToString() string {
	return fmt.Sprintf(
		"TicketEntity{ID:%s, Title:%s, Price:%f, Status:%s, TotalQuantity:%d, SoldQuantity:%d, EventTimeID:%s, CreatorID:%s, ModifierID:%s, DeletorID:%s, CreatedAt:%d, ModifiedAt:%d, DeletedAt:%d}",
		t.ID,
		t.Title,
		t.Price,
		t.Status,
		t.TotalQuantity,
		t.SoldQuantity,
		t.EventTimeID,
		t.Creator_id,
		t.Modifier_id,
		t.Deletor_id,
		t.Created_at,
		t.Modified_at,
		t.Deleted_at,
	)
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
