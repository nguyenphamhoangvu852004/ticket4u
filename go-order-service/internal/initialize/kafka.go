package initialize

import (
	"go-order-service/global"

	"github.com/segmentio/kafka-go"
)

func InitKafka() {
	k := global.Config.Kafka
	global.KafkaProducer = &kafka.Writer{
		Addr:     kafka.TCP(k.Brokers...),
		Topic:    k.Topics.OrderCreated,
		Balancer: &kafka.LeastBytes{},
	}
}
