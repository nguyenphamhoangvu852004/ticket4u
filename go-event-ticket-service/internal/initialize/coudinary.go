package initialize

import (
	"go-event-ticket-service/global"

	cloudinary "go-event-ticket-service/pkg/cloudinary"
)

func InitCloudinaryInstance() {
	global.CloudinaryClient = cloudinary.NewCloudinary()
}
