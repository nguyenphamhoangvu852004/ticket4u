package elastic

import (
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"os"

	elastic9 "github.com/elastic/go-elasticsearch/v9"
)

func NewElasticClient(addresses string, username, password string) *elastic9.Client {
	fmt.Println("Address: ", addresses)
	fmt.Println("Username: ", username)
	fmt.Println("Password: ", password)

	// TLS config tùy môi trường
	var tlsConfig *tls.Config
	env := os.Getenv("APP_ENV")
	switch env {
	case "docker":
		tlsConfig = &tls.Config{
			InsecureSkipVerify: false, // production: verify cert
		}
	case "local":
		tlsConfig = &tls.Config{
			InsecureSkipVerify: true, // local: self-signed
		}
	default:
		panic("Wrong environment")
	}

	cfg := elastic9.Config{
		Addresses: []string{addresses},
		Username:  username,
		Password:  password,
		Transport: &http.Transport{
			TLSClientConfig: tlsConfig,
		},
	}

	// Tạo client
	client, err := elastic9.NewClient(cfg)
	if err != nil {
		log.Panic("Failed to create elastic client: ", err)
	}

	return client
}
