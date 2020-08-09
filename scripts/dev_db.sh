#!/usr/bin/env bash

docker run -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres