package entity

type BaseEntity struct {
	CreatorID  string `gorm:"column:creator_id;type:varchar(255)" json:"creator_id"`
	ModifierID string `gorm:"column:modifier_id;type:varchar(255)" json:"modifier_id"`
	DeletorID  string `gorm:"column:deletor_id;type:varchar(255)" json:"deletor_id"`
	CreatedAt  int64  `gorm:"column:created_at;type:int" json:"created_at"`
	ModifiedAt int64  `gorm:"column:modified_at;type:int" json:"modified_at"`
	DeletedAt  int64  `gorm:"column:deleted_at;type:int;default:0" json:"deleted_at"`
}
