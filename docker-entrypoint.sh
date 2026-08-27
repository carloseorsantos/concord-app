#!/bin/sh
set -e

# Run prisma db push to ensure database schema is up to date
if [ -n "$DATABASE_URL" ]; then
  echo "Syncing Prisma database schema..."
  prisma db push --schema=prisma/schema.prisma --skip-generate || echo "Warning: Prisma db push failed or deferred."
fi

exec node server.js
