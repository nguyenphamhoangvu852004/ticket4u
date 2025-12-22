package dto

type (
	GetCategoriesListReq struct {
	}

	GetCategoriesListRes struct {
		Categories []CategoryOutputDTO `json:"categories"`
	}
)

type CategoryOutputDTO struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	CreatorID   string `json:"creator_id"`
	ModifierID  string `json:"modifier_id"`
	DeletorID   string `json:"deletor_id"`
	CreatedAt   int64  `json:"created_at"`
	ModifiedAt  int64  `json:"modified_at"`
	DeletedAt   int64  `json:"deleted_at"`
}
