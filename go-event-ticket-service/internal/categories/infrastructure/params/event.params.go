package params

type GetEventsParams struct {
	PaginateParams
}

type GetEventsByCategoryIdParams struct {
	PaginateParams
	CategoryId string
}

type DeleteEventParams struct {
	ID        string
	DeletedAt int64
	DeletorID string
}

type RestoreEventParams struct {
	ID string
}
