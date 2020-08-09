#!/usr/bin/env bash

password='password'

PGPASSWORD=$password psql -h 0.0.0.0 -U postgres -d postgres -f ../db/drop_all.sql
PGPASSWORD=$password psql -h 0.0.0.0 -U postgres -d postgres -f ../db/schema.sql
PGPASSWORD=$password psql -h 0.0.0.0 -U postgres -d postgres -f ../db/seed.sql