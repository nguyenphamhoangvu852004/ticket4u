package service

import (
	"context"
	"go-event-ticket-service/internal/tickets/application/dto"
)

type TicketService interface {
	GetTicketByID(ctx context.Context, ticketId string) (*dto.GetTicketByIDRes, error)
	DeleteTicket(ctx context.Context, reqData *dto.DeleteTicketReq) (*dto.DeleteTicketRes, error)
	CreateTicket(ctx context.Context, reqData *dto.CreateTicketReq) (*dto.CreateTicketRes, error)
	GetAllTickets(ctx context.Context, reqData *dto.GetTicketsListReq) (*dto.GetTicketsListRes, error)
	UpdateSoldAmount(ctx context.Context, reqData *dto.UpdateSoldAmountReq) (*dto.UpdateSoldAmountRes, error)
	// LoopReadKafkaMessage(param context.Context)
	GetTicketsByEventTimeId(ctx context.Context, reqData *dto.GetTicketsByEventTimeIdReq) (*dto.GetTicketsByEventTimeIdRes, error)
}
