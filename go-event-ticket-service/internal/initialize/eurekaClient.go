package initialize

import (
	"go-event-ticket-service/pkg/eureka"
	"go-event-ticket-service/utils"
	"time"

	"go.uber.org/zap"
)

func InitEurekaClient() {
	client, instance := eureka.Setup()

	go func() {
		ticker := time.NewTicker(25 * time.Second)
		defer ticker.Stop()

		for range ticker.C {
			err := client.SendHeartbeat(instance.App, instance.HostName)
			if err != nil {
				utils.CallLogger(utils.ErrorLevel, "Heartbeat failed, re-registering", err, zap.String("error", err.Error()))

				err = client.RegisterInstance(instance.App, instance)
				if err != nil {
					utils.CallLogger(utils.ErrorLevel, "Re-register failed", err, zap.String("error", err.Error()))
				} else {
					utils.CallLogger(utils.InfoLevel, "Re-registered to Eureka", nil, zap.Bool("reconnected", true))
				}
			}
		}
	}()
}
