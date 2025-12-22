package common

import "time"

type BaseEntity struct {
	CreatorID  string
	ModifierID string
	DeletorID  string
	CreatedAt  int64
	ModifiedAt int64
	DeletedAt  int64
}

func NewBaseEntity(creatorID string) BaseEntity {
	return BaseEntity{
		CreatorID:  creatorID,
		CreatedAt:  time.Now().Unix(),
		ModifierID: creatorID,
		ModifiedAt:  time.Now().Unix(),
	}
}

func (b *BaseEntity) MarkUpdated(modifierID string) {
	b.ModifierID = modifierID
	b.ModifiedAt = time.Now().Unix()
}

func (b *BaseEntity) MarkDeleted(deletorID string) {
	b.DeletorID = deletorID
	b.DeletedAt = time.Now().Unix()
}
