-- name: SoftDeleteTicket :execresult
UPDATE tickets
SET
	deleted_at = ?,
	deletor_id = ?
WHERE
	id = ?;

-- name: GetTickets :many
select
	t.id,
	t.title,
	t.price,
	t.status,
	t.total_quantity,
	t.sold_quantity,
	t.creator_id,
	t.modifier_id,
	t.deletor_id,
	t.created_at,
	t.modified_at,
	t.deleted_at,
	t.event_time_id
from
	tickets t
limit
	?
offset
	?;

-- name: GetTicketsById :one
select
	t.id,
	t.title,
	t.price,
	t.status,
	t.total_quantity,
	t.sold_quantity,
	t.creator_id,
	t.modifier_id,
	t.deletor_id,
	t.created_at,
	t.modified_at,
	t.deleted_at,
	t.event_time_id
from
	tickets t
where
	t.id = ?;

-- name: GetTicketsByEventTime :many
select
	t.id,
	t.title,
	t.price,
	t.status,
	t.total_quantity,
	t.sold_quantity,
	t.creator_id,
	t.modifier_id,
	t.deletor_id,
	t.created_at,
	t.modified_at,
	t.deleted_at,
	t.event_time_id
from
	tickets t
where
	t.event_time_id = ?;

-- name: CreateTicket :execresult
insert into
	tickets (
		id,
		title,
		price,
		status,
		total_quantity,
		sold_quantity,
		event_time_id,
		creator_id,
		modifier_id,
		deletor_id,
		created_at,
		modified_at,
		deleted_at
	)
values
	(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: UpdateTicketAmount :execresult
update tickets s 
set
	s.total_quantity = ?,
	s.sold_quantity = ?,
	s.status = ?,
	s.modified_at = ?,
	s.modifier_id = ?
where
	s.id = ?;