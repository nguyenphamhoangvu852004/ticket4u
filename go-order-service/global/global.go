package global

import (
	"go-order-service/pkg/setting"

	"github.com/redis/go-redis/v9"
	"github.com/segmentio/kafka-go"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

var (
	Config        *setting.Config
	Logger        *zap.Logger
	DB            *gorm.DB
	RDB           *redis.Client
	KafkaProducer *kafka.Writer
)
