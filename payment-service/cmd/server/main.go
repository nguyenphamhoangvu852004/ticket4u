package main

import (
	"go-learn/intenal/initialize"
	"go-learn/intenal/payments/presentation/http"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// s3Bucket := os.Getenv("S3_BUCKET")
	// secretKey := os.Getenv("SECRET_KEY")

	app := gin.Default()

	handler := initialize.InitPaymentModule()

	prefix := app.Group("/api/v1/2025")

	http.RegisterPaymentRoutes(prefix, handler)

	app.Run(":8088")
}
