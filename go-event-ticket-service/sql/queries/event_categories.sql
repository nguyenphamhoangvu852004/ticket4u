-- name: GetCategories :many
select
    ec.id,
    ec.title,
    ec.description,
    ec.creator_id,
    ec.modifier_id,
    ec.deletor_id,
    ec.created_at,
    ec.modified_at,
    ec.deleted_at
from
    event_categories ec
order by
    created_at DESC;

-- name: CreateCategory :execresult
insert into
    event_categories (
        id,
        title,
        description,
        creator_id,
        modifier_id,
        deletor_id,
        created_at,
        modified_at,
        deleted_at
    )
values
    (?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: GetCategoryById :one
select
    ec.id,
    ec.title,
    ec.description,
    ec.creator_id,
    ec.modifier_id,
    ec.deletor_id,
    ec.created_at,
    ec.modified_at,
    ec.deleted_at
from
    event_categories ec
where
    ec.id = ?
limit
    1;