-- +goose Up
-- +goose StatementBegin
CREATE TABLE
  IF NOT EXISTS events (
    id VARCHAR(36) NOT NULL COMMENT 'event primary key',
    title VARCHAR(50) NOT NULL COMMENT 'event title',
    address VARCHAR(255) NOT NULL COMMENT 'event address',
    organizer_id VARCHAR(36) NOT NULL COMMENT 'organizer of event',
    event_category_id VARCHAR(36) NOT NULL COMMENT 'Below to what category is',
    creator_id VARCHAR(36) NOT NULL COMMENT 'id of who created this record',
    modifier_id VARCHAR(36) NOT NULL COMMENT 'id of who last modified this record',
    deletor_id VARCHAR(36) NOT NULL COMMENT 'id of who deleted this record',
    created_at BIGINT NOT NULL COMMENT 'create date of row',
    modified_at BIGINT NOT NULL COMMENT 'modify date of row',
    deleted_at BIGINT NOT NULL COMMENT 'delete date of row',
    PRIMARY KEY (id)
  ) COMMENT = 'Main table of events';

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS events;

-- +goose StatementEnd