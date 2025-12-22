package kafka

import (
	"context"
	"encoding/json"
	"fmt"
	"go-event-ticket-service/internal/kafka/dtos"
	"go-event-ticket-service/internal/tickets/application/dto"
	"go-event-ticket-service/internal/tickets/application/service"
)

const (
	TopicOrderCreated = "order.created"
	TopicOrderUpdated = "order.updated"
)

type OrderEventHandler struct {
	ticketService service.TicketService
}

func (h *OrderEventHandler) Handle(data []byte, topic string) error {
	switch topic {
	case TopicOrderCreated:
		return h.HandleOrderCreated(data)
	case TopicOrderUpdated:
		fmt.Println("đang xử lý sau khi nhận message order.updated")
		return nil
	default:
		return nil
	}
}

func (h *OrderEventHandler) HandleOrderCreated(data []byte) error {
	var event dtos.CreateOrderReqDTO
	json.Unmarshal(data, &event)
	fmt.Println(event)
	for _, item := range event.Items {
		// thực hiện bussiness logic ở đây

		reqData := &dto.UpdateSoldAmountReq{
			OrderId: event.OrderId,
			Tickets: []dto.Ticket{
				{
					TicketId: item.ID,
					Amount:   item.Quantity,
				},
			},
		}

		response, err := h.ticketService.UpdateSoldAmount(context.Background(), reqData)
		if err != nil {
			return err
		}
		fmt.Println(response)
	}
	return nil
}

func NewOrderEventHandler(ticketService service.TicketService) *OrderEventHandler {
	return &OrderEventHandler{ticketService: ticketService}
}
