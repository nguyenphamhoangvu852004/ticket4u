-- +goose Up
-- +goose StatementBegin
ALTER TABLE events
  MODIFY COLUMN title VARCHAR(255) NOT NULL COMMENT 'event title';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE events
  MODIFY COLUMN title VARCHAR(50) NOT NULL COMMENT 'event title';
-- +goose StatementEnd
