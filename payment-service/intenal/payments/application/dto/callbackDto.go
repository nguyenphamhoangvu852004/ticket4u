package dto

type MomoCallback struct {
	PartnerCode string `json:"partnerCode"`
	OrderId     string `json:"orderId"`
	RequestId   string `json:"requestId"`
	Amount      int    `json:"amount"`
	ResultCode  int    `json:"resultCode"`
	Message     string `json:"message"`
	Signature   string `json:"signature"`
}
