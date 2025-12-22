-- +goose Up
-- +goose StatementBegin
CREATE TABLE
  IF NOT EXISTS event_times (
    id VARCHAR(36) NOT NULL COMMENT 'primary key',
    start_time BIGINT NOT NULL COMMENT 'start timestamp of the event',
    end_time BIGINT NOT NULL COMMENT 'end timestamp of the event',
    description TEXT DEFAULT NULL COMMENT 'description of the event time',
    event_id VARCHAR(36) NOT NULL COMMENT 'related event id',
    creator_id VARCHAR(36) NOT NULL COMMENT 'id of who created this record',
    modifier_id VARCHAR(36) NOT NULL COMMENT 'id of who last modified this record',
    deletor_id VARCHAR(36) NOT NULL COMMENT 'id of who deleted this record',
    created_at BIGINT NOT NULL COMMENT 'create date of row',
    modified_at BIGINT NOT NULL COMMENT 'modify date of row',
    deleted_at BIGINT NOT NULL COMMENT 'delete date of row',
    PRIMARY KEY (id)
  ) COMMENT = 'Table storing start and end times of events';

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
Drop table if exists event_times;

-- +goose StatementEnd