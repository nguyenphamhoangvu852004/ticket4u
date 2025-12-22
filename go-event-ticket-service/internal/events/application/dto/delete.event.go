package dto

type DeleteEventReq struct {
	ID        string `json:"id"`
	DeletorId string `json:"deletorId"`
}
