run-postgres: 
	docker run --name segment3d-db -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=postgres -d postgres:12.17-alpine3.19

postgres-up: 
	docker start segment3d-db

postgres-down: 
	docker stop segment3d-db

create-db: 
	docker exec -it segment3d-db createdb --username=root --owner=root segment3d_db

drop-db: 
	docker exec -it segment3d-db dropdb -U root segment3d_db

migrate-up: 
	migrate -path db/migration -database "postgresql://root:postgres@103.52.115.128:5432/autorepl?sslmode=disable" --verbose up

migrate-down:
	migrate -path db/migration -database "postgresql://root:postgres@103.52.115.128:5432/autorepl?sslmode=disable" --verbose down

sqlc:
	sqlc generate

server-dev:
	air

server-prod:
	go run main.go

swagger:
	swag i

test:
	go test ./... -cover -v