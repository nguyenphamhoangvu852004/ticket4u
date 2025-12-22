-- +goose Up
-- +goose StatementBegin
alter table tickets add constraint fk_tickets_event_time_id foreign key (event_time_id) references event_times (id);

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
alter table tickets
drop foreign key fk_tickets_event_time_id;

-- +goose StatementEnd