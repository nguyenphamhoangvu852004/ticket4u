package entity

type OrderItem struct {
	UUID       string `gorm:"column:uuid;primaryKey;type:varchar(255)" json:"uuid"`
	TicketUUID string `gorm:"column:ticket_uuid;type:varchar(255)" json:"ticket_uuid"`
	Quantity   int    `gorm:"column:quantity;type:int" json:"quantity"`
	OrderUUID  string `gorm:"column:order_uuid;type:varchar(255)" json:"order_uuid"`
	BaseEntity
}

func (OrderItem) TableName() string {
	return "order_items"
}
