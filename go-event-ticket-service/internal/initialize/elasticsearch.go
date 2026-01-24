package initialize

import (
	"go-event-ticket-service/global"
	elastic "go-event-ticket-service/pkg/elasticsearch"
)

func InitElasticsearch() {
	global.ElasticSearchClient = elastic.NewElasticClient(
		global.Config.Elasticsearch.Addresses,
		global.Config.Elasticsearch.Username,
		global.Config.Elasticsearch.Password,
	)
}
