-- name: CreateEventTime :execresult
insert into
    event_times (
        id,
        start_time,
        end_time,
        description,
        creator_id,
        modifier_id,
        event_id,
        deletor_id,
        created_at,
        modified_at,
        deleted_at
    )
values
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: GetEventTimeById :one
select
    et.id,
    et.start_time,
    et.end_time,
    et.description,
    et.event_id,
    et.creator_id,
    et.modifier_id,
    et.deletor_id,
    et.created_at,
    et.modified_at,
    et.deleted_at
from
    event_times et
where
    et.id = ?
limit
    1;

-- name: GetEventTimesByEventId :many
select
    et.id,
    et.start_time,
    et.end_time,
    et.description,
    et.event_id,
    et.creator_id,
    et.modifier_id,
    et.deletor_id,
    et.created_at,
    et.modified_at,
    et.deleted_at
from
    event_times et
where
     et.deleted_at = 0 and et.event_id = ?
limit
    ?
offset
    ?;

-- name: GetEventTimes :many
select
    et.id,
    et.start_time,
    et.end_time,
    et.description,
    et.event_id,
    et.creator_id,
    et.modifier_id,
    et.deletor_id,
    et.created_at,
    et.modified_at,
    et.deleted_at
from
    event_times et
limit
    ?
offset
    ?;

-- name: UpdateEventTimeById :execresult
-- update event_times et
-- SET start_time = ?,end_time=?,description = ?,modifier_id = ?, modified_at = ?
-- where et.id = ?;
-- name: PatchEventTimeById :execresult
UPDATE event_times
SET
    start_time = COALESCE(UNIX_TIMESTAMP (), start_time),
    end_time = COALESCE(?, end_time),
    description = COALESCE(?, description),
    modifier_id = COALESCE(?, modifier_id),
    modified_at = COALESCE(?, modified_at)
WHERE
    id = ?;

-- name: SoftDeleteEventTime :execresult
UPDATE event_times
SET
    deleted_at = ?,
    deletor_id = ?
WHERE
    id = ?;