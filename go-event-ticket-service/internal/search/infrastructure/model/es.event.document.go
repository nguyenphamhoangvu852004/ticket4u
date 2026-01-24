package model

type EventDocument struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Address string `json:"address"`

	Category EventCategory `json:"category"`

	OrganizerID string `json:"organizer_id"`

	CreatedAt  int64 `json:"created_at"`
	ModifiedAt int64 `json:"modified_at"`

	DeletedAt int64  `json:"deleted_at"`
	DeletorID string `json:"deletor_id"`
}

type EventCategory struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}
