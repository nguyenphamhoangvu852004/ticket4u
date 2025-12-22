package kafka

import (
	"go-event-ticket-service/global"

	"github.com/segmentio/kafka-go"
)

func NewKafkaConsumer() *kafka.Reader {
	config := kafka.ReaderConfig{
		Brokers:     global.Config.Kafka.Brokers,
		GroupID:     global.Config.Kafka.GroupID,
		GroupTopics: global.Config.Kafka.Topics,
	}
	return kafka.NewReader(config)
}
