package eureka

import (
	"fmt"
	"go-event-ticket-service/global"

	"github.com/ArthurHlt/go-eureka-client/eureka"
)

func Setup() (*eureka.Client, *eureka.InstanceInfo) {
	client := eureka.NewClient([]string{
		fmt.Sprintf("http://%s:%d/eureka", global.Config.EurekaClient.Hostname, global.Config.EurekaClient.Port),
	})

	instance := eureka.NewInstanceInfo(
		"go-event-ticket-service",
		"EVENT-TICKET-SERVICE",
		"go-event-ticket-service",
		8085,
		30,
		false)

	instance.VipAddress = "EVENT-TICKET-SERVICE"
	// func (c *Client) RegisterInstance(appId string, instanceInfo *InstanceInfo) error
	client.RegisterInstance("EVENT-TICKET-SERVICE", instance) // Register new instance in your eureka(s)
	// client.GetApplications()                                  // Retrieves all applications from eureka server(s)
	// client.GetApplication(instance.App)                       // retrieve the application "test"
	// client.GetInstance(instance.App, instance.HostName)       // retrieve the instance from "test.com" inside "test"" app

	return client, instance

}
