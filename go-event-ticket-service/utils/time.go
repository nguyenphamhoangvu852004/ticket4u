package utils

import (
	"fmt"
	"time"
)

func IsValidTimeFormatISO8601(dateString string) bool {
	_, err := time.Parse("2006-01-02", dateString)
	fmt.Println(err)
	if err != nil {
		return false
	}
	return true
}

func ConvertISO8601ToUnix(dateString string) int64 {
	t, _ := time.Parse("2006-01-02", dateString)
	return t.Unix()
}
