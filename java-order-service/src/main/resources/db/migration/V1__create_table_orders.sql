CREATE TABLE IF NOT EXISTS orders(
	id varchar(36) not null comment 'identifier of row', 
	status ENUM('PENDING', 'PAID', 'CANCELLED', 'SUCCESS') NOT NULL DEFAULT 'PENDING' COMMENT 'status of the order', 
	user_id varchar(36) not null comment 'related to user table', 
	creator_id VARCHAR(36) NOT NULL COMMENT 'id of who created this record', 
	modifier_id VARCHAR(36) NOT NULL COMMENT 'id of who last modified this record', 
	deletor_id VARCHAR(36) NOT NULL COMMENT 'id of who deleted this record', 
	created_at BIGINT NOT NULL COMMENT 'create date of row', 
	modified_at BIGINT NOT NULL COMMENT 'modify date of row', 
	deleted_at BIGINT NOT NULL COMMENT 'delete date of row', 
	primary key (id)
) comment = 'Order table';
