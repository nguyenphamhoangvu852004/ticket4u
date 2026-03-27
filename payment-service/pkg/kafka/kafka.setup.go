package kafka

import (
	"github.com/segmentio/kafka-go"
)

func NewKafkaConsumer(brokers []string, groupID string, groupTopics []string) *kafka.Reader {
	config := kafka.ReaderConfig{
		Brokers:     brokers,
		GroupID:     groupID,
		GroupTopics: groupTopics,
	}
	return kafka.NewReader(config)
}

func NewKafkaProducer(brokers []string, topic string) *kafka.Writer {
	return &kafka.Writer{
		Addr:     kafka.TCP(brokers...),
		Topic:    topic,
		Balancer: &kafka.LeastBytes{},
	}
}
