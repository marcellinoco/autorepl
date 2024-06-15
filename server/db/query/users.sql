-- name: CreateUser :one
INSERT INTO "users" (
        email,
        name,
        avatar,
        "accessToken"
    )
VALUES ($1, $2, $3, $4)
RETURNING *;
-- name: GetUserById :one
SELECT *
FROM "users"
WHERE uid = $1
LIMIT 1;
-- name: GetUserByoAuthToken :one
SELECT *
FROM "users"
WHERE "accessToken" = $1
LIMIT 1;
-- name: GetUserByEmail :one
SELECT *
FROM "users"
WHERE email = $1
LIMIT 1;
-- name: UpdateUser :one
UPDATE "users"
SET email = $2,
    name = $3,
    avatar = $4,
    "accessToken" = $5,
    "updatedAt" = now()
WHERE uid = $1
RETURNING *;