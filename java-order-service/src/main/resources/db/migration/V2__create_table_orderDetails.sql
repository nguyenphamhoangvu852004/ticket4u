CREATE TABLE IF NOT EXISTS order_details(
	id varchar(36) not null comment 'identifier of row', 
    quantity tinyint not null comment 'quantity per item', 
    order_id varchar(36) not NULL comment 'related to order table', 
    ticket_id varchar(36) not null comment 'related to ticket table', 
    creator_id VARCHAR(36) NOT NULL COMMENT 'id of who created this record', 
    modifier_id VARCHAR(36) NOT NULL COMMENT 'id of who last modified this record', 
    deletor_id VARCHAR(36) NOT NULL COMMENT 'id of who deleted this record', 
    created_at BIGINT NOT NULL COMMENT 'create date of row', 
    modified_at BIGINT NOT NULL COMMENT 'modify date of row', 
    deleted_at BIGINT NOT NULL COMMENT 'delete date of row', 
    primary key (id)
) comment = 'Order detail table';