package clientimpl

import (
	"encoding/json"
	"fmt"
	httpClient "go-event-ticket-service/internal/eventTimes/domain/apiClient"
	"go-event-ticket-service/internal/eventTimes/domain/entity"
	"io/ioutil"
	"net/http"
	"time"
)

type eventAPIClient struct {
	baseUrl    string
	httpClient *http.Client
}

// GetEventByID implements httpClient.EventAPIClient.
func (e *eventAPIClient) GetEventByID(id string) (entity *entity.EventEntity, err error) {

	uriString := fmt.Sprint(e.baseUrl, "/events/", id)

	resp, _ := e.httpClient.Get(uriString)

	respBytes, _ := ioutil.ReadAll(resp.Body)

	if err := json.Unmarshal(respBytes, &entity); err != nil {
		return nil, err
	}
	
	return entity, nil
}

func NewEventAPIClient(baseUrl string) httpClient.EventAPIClient {
	return &eventAPIClient{
		baseUrl:    baseUrl,
		httpClient: &http.Client{Timeout: 5 * time.Second},
	}
}
