package utils

import (
	"fmt"
	"math/rand"
)

func GenerateRandomString(length int) string {
	var letters = []int32("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	fmt.Println(letters)
	s := make([]int32, length)
	for i := range s {
		s[i] = letters[rand.Intn(len(letters))]
	}
	return string(s)
}
