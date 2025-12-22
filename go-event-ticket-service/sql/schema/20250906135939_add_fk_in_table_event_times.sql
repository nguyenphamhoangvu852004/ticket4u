-- +goose Up
-- +goose StatementBegin
alter table event_times
add constraint fk_event_times_event_id foreign key (event_id) references events(id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
alter table event_times
drop foreign key fk_event_times_event_id;
-- +goose StatementEnd
