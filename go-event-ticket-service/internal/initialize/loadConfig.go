package initialize

import (
	"fmt"
	"go-event-ticket-service/global"
	"os"

	"github.com/spf13/viper"
)

func LoadConfig() {

	viper := viper.New() // *viper.Viper
	env := os.Getenv("APP_ENV")

	switch env {
	case "docker":

		viper.AddConfigPath("../config")
		viper.SetConfigName("config.docker")
		viper.SetConfigType("yaml")
	case "local":

		viper.AddConfigPath("./config")
		viper.SetConfigName("config.local")
		viper.SetConfigType("yaml")
	default:
		panic("Wrong environment")
	}

	// // đọc config
	if err := viper.ReadInConfig(); err != nil {
		panic(fmt.Errorf("Failed to read in YAML file: %w", err))
	}

	if err := viper.Unmarshal(&global.Config); err != nil {
		panic(fmt.Errorf("Failed to unmarshal YAML file: %w", err))
	}
}
