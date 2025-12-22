package response

const (
	CreateSuccessCode             = 2000
	FindSuccessCode               = 2001
	UpdateSuccessCode             = 2002
	DeleteSuccessCode             = 2003
	ExistsCode                    = 2004
	RegisterSuccessCode           = 2005
	SuccessSendEmailOTPCode       = 2006
	VerifyOTPSuccess              = 2007
	SetupTwoFactorAuthCodeSuccess = 2008
)

const (
	ErrorSuccessCode          = 3000
	ErrorNotFoundCode         = 3001
	ErrorParameterInvalidCode = 3002
	ErrorUnauthorizedCode     = 3003
	ErrorInternalServerCode   = 3004
	ErrorProcessUseCaseCode   = 3005
	ErrorNotExistCode         = 3006
	ErrorInValidOTP           = 3007
	ErrorSendEmailOTPCode     = 3008
	ErrorExistData            = 3009
	ErrorOTPNotExists         = 3010
	ErrorOTPNotMatch          = 3011
	ErrorAuthFailed           = 3012
	// Two facetor
	ErrorCodeTwoFactorAuthenSetup = 3013
	// Verify fail
	ErrorCodeTwoFactorAuthenVerify = 3014
)

var msgSuccessMap = map[int]string{
	CreateSuccessCode:             "Create success",
	FindSuccessCode:               "Find success",
	UpdateSuccessCode:             "Update success",
	DeleteSuccessCode:             "Delete success",
	ExistsCode:                    "Data already exists",
	RegisterSuccessCode:           "Register success",
	SuccessSendEmailOTPCode:       "Success send email OTP",
	VerifyOTPSuccess:              "Verify Otp Success ",
	SetupTwoFactorAuthCodeSuccess: "Setup two factor auth code success",
}

var msgErrorMap = map[int]string{
	ErrorSuccessCode:               "Failed",
	ErrorNotFoundCode:              "Data not found",
	ErrorParameterInvalidCode:      "Parameter invalid",
	ErrorUnauthorizedCode:          "Unauthorized",
	ErrorInternalServerCode:        "Internal server error",
	ErrorProcessUseCaseCode:        "Error process use case",
	ErrorNotExistCode:              "Data does not exist",
	ErrorInValidOTP:                "Invalid OTP",
	ErrorSendEmailOTPCode:          "Error sending email OTP",
	ErrorExistData:                 "Data already exists",
	ErrorOTPNotExists:              "OTP not exists",
	ErrorOTPNotMatch:               "OTP not match",
	ErrorAuthFailed:                "Authentication Failed",
	ErrorCodeTwoFactorAuthenSetup:  "Error code two factor authen setup",
	ErrorCodeTwoFactorAuthenVerify: "Error code two factor authen verify",
}
