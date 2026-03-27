package domain

type Payload struct {
	OrderID      string `json:"orderId"`
	PartnerCode  string `json:"partnerCode"`
	AccessKey    string `json:"accessKey"`
	RequestID    string `json:"requestId"`
	Amount       int64  `json:"amount"`
	OrderInfo    string `json:"orderInfo"`
	PartnerName  string `json:"partnerName"`
	StoreId      string `json:"storeId"`
	OrderGroupId string `json:"orderGroupId"`
	Lang         string `json:"lang"`
	AutoCapture  bool   `json:"autoCapture"`
	RedirectUrl  string `json:"redirectUrl"`
	IpnUrl       string `json:"ipnUrl"`
	ExtraData    string `json:"extraData"`
	RequestType  string `json:"requestType"`
	Signature    string `json:"signature"`
}
