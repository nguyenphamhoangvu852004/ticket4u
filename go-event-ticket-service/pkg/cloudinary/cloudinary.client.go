package cloudinary

import (
	"go-event-ticket-service/global"
	"go-event-ticket-service/utils"

	"github.com/cloudinary/cloudinary-go/v2"
)

func NewCloudinary() *cloudinary.Cloudinary {
	globalCloudinaryConfig := global.Config.Cloudinary
	cld, err := cloudinary.NewFromParams(
		globalCloudinaryConfig.CloudName,
		globalCloudinaryConfig.Key,
		globalCloudinaryConfig.Secret,
	)
	if err != nil {
		utils.CallLogger(utils.ErrorLevel, "Init Cloudinary Failed", err)
	}
	return cld
}
