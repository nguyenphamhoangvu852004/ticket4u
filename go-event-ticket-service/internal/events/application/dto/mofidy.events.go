package dto

type (
	ModifyEventReq struct {
		ID          string
		ModifierId  *string `json:"modifierId" `
		Title       *string `json:"title" `
		Address     *string `json:"address" `
		OrganizerId *string `json:"organizerId" `
	}

	ModifyEventRes struct {
		ID string `json:"id"`
	}
)
