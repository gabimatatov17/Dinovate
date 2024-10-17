#!/bin/bash
set -e

# Start MongoDB in the background
mongod --bind_ip_all &

# Wait for MongoDB to start (this ensures the database is up before we restore)
until mongo --eval "print(\"MongoDB is up\")" > /dev/null 2>&1; do
  sleep 2
done

# Restore the database from /tmp/Dinovate
mongorestore --db Dinovate /tmp/Dinovate

# Keep MongoDB running in the foreground
fg %1
