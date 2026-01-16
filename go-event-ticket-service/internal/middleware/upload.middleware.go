package middleware

import (
	"fmt"
	"go-event-ticket-service/global"
	"go-event-ticket-service/utils"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func UploadMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		fileHeader, err := c.FormFile("image")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"code":    http.StatusBadRequest,
				"message": err.Error(),
			})
		}
		file, err := fileHeader.Open()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"code":    http.StatusBadRequest,
				"message": err.Error(),
			})
		}
		defer file.Close()

		publicID := fmt.Sprint(time.Now().Unix()) + "-" + uuid.New().String() + "-" + strings.Split(fileHeader.Filename, ".")[0]

		resp, err := utils.UploadToCloudinary(global.CloudinaryClient, file, publicID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"code":    http.StatusInternalServerError,
				"message": err.Error(),
			})
		}

		c.Set("imageURL", resp.URL)
		fmt.Println("imageURl", resp.URL)

		// c.JSON(http.StatusOK, gin.H{
		// 	"code":    http.StatusOK,
		// 	"message": "success",
		// 	"data":    resp,
		// })

		c.Next()
	}
}
