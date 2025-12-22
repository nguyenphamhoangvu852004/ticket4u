-- +goose Up
-- +goose StatementBegin
alter table events 
add constraint fk_events_event_category_id foreign key (event_category_id) references event_categories (id);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
ALTER TABLE events
DROP FOREIGN KEY fk_events_event_category_id;

-- +goose StatementEnd
