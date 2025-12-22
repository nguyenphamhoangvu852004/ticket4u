package kafka

import (
	"context"
	"log"

	"github.com/segmentio/kafka-go"
)

type OrderConsumer struct {
	reader  *kafka.Reader
	handler OrderEventHandler
}

func (c *OrderConsumer) Start(ctx context.Context) {
	for {
		msg, err := c.reader.ReadMessage(ctx)
		if err != nil {
			log.Println(err)
			continue
		}
		c.handler.Handle(msg.Value, msg.Topic)
	}
}

func NewOrderConsumer(reader *kafka.Reader, handler OrderEventHandler) *OrderConsumer {
	consumer := &OrderConsumer{reader: reader, handler: handler}

	go func() {
		consumer.Start(context.Background())
	}()

	return consumer
}
