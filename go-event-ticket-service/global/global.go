package global

import (
	"database/sql"
	"go-event-ticket-service/internal/database"
	"go-event-ticket-service/pkg/logger"
	"go-event-ticket-service/pkg/setting"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/elastic/go-elasticsearch/v9"
	"github.com/redis/go-redis/v9"
	"github.com/segmentio/kafka-go"
	"golang.org/x/oauth2"
)

var (
	Config            setting.Config
	Logger            *logger.LoggerZap
	Mdbc              *sql.DB
	Rdb               *redis.Client
	DbQueries         *database.Queries
	GoogleOAuthConfig *oauth2.Config
	BaseUrl           string
	KafkaProducer     *kafka.Writer
	KafkaConsumer     *kafka.Reader
	CloudinaryClient  *cloudinary.Cloudinary
	ElasticSearchClient *elasticsearch.Client
)
