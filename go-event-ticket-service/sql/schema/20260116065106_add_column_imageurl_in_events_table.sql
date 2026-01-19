-- +goose Up
-- +goose StatementBegin
ALTER TABLE events ADD COLUMN image_url VARCHAR(255) NULL COMMENT 'image url';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE events DROP COLUMN image_url;
-- +goose StatementEnd
