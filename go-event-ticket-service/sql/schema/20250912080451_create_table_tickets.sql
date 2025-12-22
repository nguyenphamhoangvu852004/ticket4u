-- +goose Up
-- +goose StatementBegin
CREATE TABLE
    IF NOT EXISTS tickets (
        id VARCHAR(36) NOT NULL COMMENT 'ticket primary key',
        title VARCHAR(50) NOT NULL COMMENT 'ticket title',
        price FLOAT NOT NULL COMMENT 'ticket price',
        status ENUM ('available', 'sold_out', 'inactive') NOT NULL DEFAULT 'available' COMMENT 'ticket status',
        total_quantity MEDIUMINT NOT NULL COMMENT 'total number of tickets',
        sold_quantity MEDIUMINT NOT NULL DEFAULT 0 COMMENT 'number of tickets sold',
        event_time_id varchar(36) not null comment 'relate to event time table',
        creator_id VARCHAR(36) NOT NULL COMMENT 'id of who created this record',
        modifier_id VARCHAR(36) NOT NULL COMMENT 'id of who last modified this record',
        deletor_id VARCHAR(36) NOT NULL COMMENT 'id of who deleted this record',
        created_at BIGINT NOT NULL COMMENT 'create date of row',
        modified_at BIGINT NOT NULL COMMENT 'modify date of row',
        deleted_at BIGINT NOT NULL COMMENT 'delete date of row',
        PRIMARY KEY (id)
    ) COMMENT = 'Tickets for events';

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
drop table if exists tickets;

-- +goose StatementEnd