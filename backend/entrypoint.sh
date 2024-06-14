#!/bin/sh

# Wait until the database is ready and run migrations
until bun run prisma:migrate; do
  echo "Waiting for the database to be ready..."
  sleep 2
done

# Start the application
bun src/index.ts
