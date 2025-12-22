-- +goose Up
-- +goose StatementBegin
CREATE TABLE
  IF NOT EXISTS event_categories (
    id VARCHAR(36) NOT NULL COMMENT 'identify the event category',
    title VARCHAR(30) NOT NULL COMMENT 'title of event category',
    description VARCHAR(100) DEfault NULL COMMENT 'description of event category',
    creator_id VARCHAR(36) NOT NULL COMMENT 'id of who created this record',
    modifier_id VARCHAR(36) NOT NULL COMMENT 'id of who last modified this record',
    deletor_id VARCHAR(36) NOT NULL COMMENT 'id of who deleted this record',
    created_at BIGINT NOT NULL COMMENT 'create date of row',
    modified_at BIGINT NOT NULL COMMENT 'modify date of row',
    deleted_at BIGINT NOT NULL COMMENT 'delete date of row',
    PRIMARY KEY (id)
  ) COMMENT = 'Table category of event';

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
drop table if exists `event_categories`;

-- +goose StatementEnd