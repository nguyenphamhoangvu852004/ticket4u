package initialize

import (
	"go-event-ticket-service/global"
	"go-event-ticket-service/pkg/kafka"
)

func InitKafkaV2() {
	global.KafkaConsumer = kafka.NewKafkaConsumer()
}
