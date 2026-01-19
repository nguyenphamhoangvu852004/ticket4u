package utils

import (
	"context"
	"mime/multipart"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

func UploadToCloudinary(
	cld *cloudinary.Cloudinary,
	file multipart.File,
	publicID string,
) (*uploader.UploadResult, error) {

	res, err := cld.Upload.Upload(
		context.Background(),
		file,
		uploader.UploadParams{
			PublicID: publicID,
			Folder:   "ticket4u",
		},
	)

	return res, err
}
