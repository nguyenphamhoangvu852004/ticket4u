package initialize

import (
	"go-learn/intenal/payments/application/service"
	"go-learn/intenal/payments/presentation/http"
	"go-learn/pkg/kafka"
	"os"
)

func InitPaymentModule() *http.PaymentHandler {
	brokers := []string{os.Getenv("BROKERS")}
	topic := os.Getenv("KAFKA_PAYMENT_EVENTS_TOPIC")

	kafkaProducer := kafka.NewKafkaProducer(brokers, topic)
	service := service.NewPaymentService(kafkaProducer, topic)
	handler := http.NewPaymentHandler(service)

	return handler
}
