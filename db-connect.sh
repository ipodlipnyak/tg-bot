#!/bin/bash
echo "password: ai"
docker compose exec db psql -U ai
#psql -h 127.0.0.1 -U ai -W ai
