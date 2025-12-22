package initialize

import (
	"fmt"
	"go-event-ticket-service/global"

	"github.com/spf13/viper"
)

func LoadConfig() {

	viper := viper.New()
	viper.AddConfigPath("../config")
	viper.SetConfigName("dev")
	viper.SetConfigType("yaml")

	// // đọc config
	if err := viper.ReadInConfig(); err != nil {
		panic(fmt.Errorf("Failed to read in YAML file: %w", err))
	}

	fmt.Printf("Raw config: %#v\n", viper.AllSettings())
	// fmt.Println("Server Port: ", viper.GetInt("server.port"))
	// fmt.Println("Database Name: ", viper.GetString("mysql.host"))

	if err := viper.Unmarshal(&global.Config); err != nil {
		panic(fmt.Errorf("Failed to unmarshal YAML file: %w", err))
	}
}
