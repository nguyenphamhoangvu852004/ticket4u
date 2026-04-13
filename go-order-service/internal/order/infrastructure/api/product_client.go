package api

import (
	"context"
	"encoding/json"
	"fmt"
	"go-order-service/global"
	"go-order-service/internal/order/infrastructure/api/dto"
	"io"
	"net/http"
	"strings"
)

type IProductClient interface {
	GetTicketByID(ctx context.Context, ticketID string) (*dto.TicketData, error)
	GetTicketsByIDs(ctx context.Context, ids []string) ([]dto.TicketData, error)
}

type productClient struct {
	baseURL string
}

func NewProductClient() IProductClient {
	return &productClient{
		baseURL: global.Config.App.ProductURL + "/tickets",
	}
}

func (c *productClient) GetTicketByID(ctx context.Context, ticketID string) (*dto.TicketData, error) {
	url := fmt.Sprintf("%s/%s", c.baseURL, ticketID)
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, err
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("product service returned status: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var res dto.TicketResponseData
	if err := json.Unmarshal(body, &res); err != nil {
		return nil, err
	}

	// Re-marshal and unmarshal to get the correct type
	dataBytes, _ := json.Marshal(res.Data)
	var ticket dto.TicketData
	if err := json.Unmarshal(dataBytes, &ticket); err != nil {
		return nil, err
	}

	return &ticket, nil
}

func (c *productClient) GetTicketsByIDs(ctx context.Context, ids []string) ([]dto.TicketData, error) {
	idsParam := strings.Join(ids, ",")
	url := fmt.Sprintf("%s?ids=%s", c.baseURL, idsParam)

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, err
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("product service returned status: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var res dto.TicketResponseData
	if err := json.Unmarshal(body, &res); err != nil {
		return nil, err
	}

	dataBytes, _ := json.Marshal(res.Data)
	var tickets []dto.TicketData
	if err := json.Unmarshal(dataBytes, &tickets); err != nil {
		return nil, err
	}

	return tickets, nil
}
