package main

import (
	"fmt"
	"go-event-ticket-service/utils"
)

func main() {
	str := utils.GenerateRandomString(12)
	fmt.Println(str)
}
