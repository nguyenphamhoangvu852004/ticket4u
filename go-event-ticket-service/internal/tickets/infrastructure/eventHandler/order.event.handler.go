package eventHandler

import (
	"context"
	"encoding/json"
	"fmt"
	"go-event-ticket-service/internal/tickets/application/dto"
	"go-event-ticket-service/internal/tickets/application/service"
	"go-event-ticket-service/internal/tickets/infrastructure/eventHandler/dtos"
)

type OrderEventHandler struct {
	ticketService service.TicketService
}

func NewOrderEventHandler(ticketService service.TicketService) *OrderEventHandler {
	return &OrderEventHandler{ticketService: ticketService}
}

func (o *OrderEventHandler) HandleOrderCreated(msg []byte) error {
	var dtos dtos.CreateOrderReqDTO
	if err := json.Unmarshal(msg, &dtos); err != nil {
		return fmt.Errorf("decode error: %w", err)
	}

	var tickets []dto.Ticket
	for _, item := range dtos.Items {
		tickets = append(tickets, dto.Ticket{
			TicketId: item.ID,
			Amount:   item.Quantity,
		})
	}

	if _, errs := o.ticketService.UpdateSoldAmount(context.Background(), &dto.UpdateSoldAmountReq{
		OrderId: "order-001",
		Tickets: tickets,
	}); errs != nil {
		return fmt.Errorf("update sold amount failed: %w", errs)
	}

	return nil
}
