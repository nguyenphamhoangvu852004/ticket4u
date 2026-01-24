package elastic

import (
	"crypto/tls"
	"log"
	"net/http"
	"os"

	elastic9 "github.com/elastic/go-elasticsearch/v9"
)

func NewElasticClient(addresses []string, username, password string) *elastic9.Client {
	var tslConfig *tls.Config
	env := os.Getenv("APP_ENV")
	switch env {
	case "docker":
		tslConfig = &tls.Config{
			InsecureSkipVerify: false,
		}
	case "local":
		tslConfig = &tls.Config{
			InsecureSkipVerify: true,
		}
	default:
		panic("Wrong environment")
	}

	cfg := elastic9.Config{
		Addresses: addresses,
		Username:  username,
		Password:  password,
		Transport: &http.Transport{
			TLSClientConfig: tslConfig,
		},
	}

	client, err := elastic9.NewClient(cfg)
	if err != nil {
		log.Panic(err.Error())
	}
	return client
}
