package dto

type (
	RestoreEventReq struct {
		ID string `json:"id"`
		RestoreID string `json:"restoreId"`
	}
	RestoreEventRes struct {
		ID string `json:"id"`
	}
)
