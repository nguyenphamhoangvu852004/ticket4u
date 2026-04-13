package entity

type Order struct {
	ID     string      `gorm:"column:id;primaryKey;type:varchar(255)" json:"id"`
	Status OrderStatus `gorm:"column:status;type:varchar(50)" json:"status"`
	UserID string      `gorm:"column:user_id;type:varchar(255)" json:"user_id"`
	Items  []OrderItem `gorm:"foreignKey:OrderUUID;references:ID" json:"items"`
	BaseEntity
}

func (Order) TableName() string {
	return "orders"
}
