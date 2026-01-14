-- name: GetEventsByCategoryId :many
select
	e.id,
	e.title,
	e.address,
	e.organizer_id,
	e.event_category_id,
	e.creator_id,
	e.modifier_id,
	e.deletor_id,
	e.created_at,
	e.modified_at,
	e.deleted_at,
	ec.title as event_category_title,
	ec.description as event_category_description
from
	events e
	join event_categories ec on e.event_category_id = ec.id
where
	e.deleted_at = 0
	and e.event_category_id = ?
limit
	?
offset
	?;

-- name: GetEvents :many
select
	e.id,
	e.title,
	e.address,
	e.organizer_id,
	e.event_category_id,
	e.creator_id,
	e.modifier_id,
	e.deletor_id,
	e.created_at,
	e.modified_at,
	e.deleted_at,
	ec.title as event_category_title,
	ec.description as event_category_description
from
	events e
	join event_categories ec on e.event_category_id = ec.id
where
	e.deleted_at = 0
order by
	e.created_at desc
limit
	?
offset
	?;

-- name: GetDeletedEvents :many
select
	e.id,
	e.title,
	e.address,
	e.organizer_id,
	e.event_category_id,
	e.creator_id,
	e.modifier_id,
	e.deletor_id,
	e.created_at,
	e.modified_at,
	e.deleted_at,
	ec.title as event_category_title,
	ec.description as event_category_description
from
	events e
	join event_categories ec on e.event_category_id = ec.id
where
	e.deleted_at != 0
order by
	e.created_at desc
limit
	?
offset
	?;

-- name: GetEventById :one
select
	e.id,
	e.title,
	e.address,
	e.organizer_id,
	e.event_category_id,
	e.creator_id,
	e.modifier_id,
	e.deletor_id,
	e.created_at,
	e.modified_at,
	e.deleted_at,
	ec.title as event_category_title,
	ec.description as event_category_description
from
	events e
	join event_categories ec on e.event_category_id = ec.id
where
	e.deleted_at = 0
	and e.id = ?
limit
	1;

-- name: GetDeletedEventById :one
explain
select
	e.id,
	e.title,
	e.address,
	e.organizer_id,
	e.event_category_id,
	e.created_at,
	e.modified_at,
	e.deleted_at
from
	events e
where
	e.deleted_at != 0
	and e.id = ?
limit
	1;

-- name: CreateEvents :execresult
insert into
	events (
		id,
		title,
		address,
		organizer_id,
		event_category_id,
		creator_id,
		modifier_id,
		deletor_id,
		created_at,
		modified_at,
		deleted_at
	)
values
	(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: UpdateEvents :exec
UPDATE events
SET
	title = COALESCE(sqlc.narg (title), title),
	address = COALESCE(sqlc.narg (address), address),
	organizer_id = COALESCE(sqlc.narg (organizer_id), organizer_id),
	modified_at = COALESCE(sqlc.arg (modified_at), modified_at),
	modifier_id = COALESCE(sqlc.arg (modifier_id), modifier_id)
WHERE
	id = sqlc.arg (id)
	AND deleted_at = 0;

-- name: SoftDeleteEvent :exec
update events
set
	deleted_at = ?,
	deletor_id = ?
where
	id = ?;

-- name: RestoreEvent :exec
update events
set
	deleted_at = 0,
	deletor_id = ''
where
	id = ?;

-- name: Count :one
select count(*) from events;

-- name: GetEventsByOrganizerId :many
select
	e.id,
	e.title,
	e.address,
	e.organizer_id,
	e.event_category_id,
	e.creator_id,
	e.modifier_id,
	e.deletor_id,
	e.created_at,
	e.modified_at,
	e.deleted_at,
	ec.title as event_category_title,
	ec.description as event_category_description
from
	events e
	join event_categories ec on e.event_category_id = ec.id
where
	e.deleted_at = 0
	and e.organizer_id = ?
order by
	e.created_at desc
limit
	?
offset
	?;