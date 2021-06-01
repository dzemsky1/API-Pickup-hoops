#!/bin/bash

API="http://localhost:4741"
URL_PATH="/challenges"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "challenge": {
      "hometeam": "'"${NAME}"'",
      "awayteam": "'"${MEMBERS}"'",
      "location": "'"${LOCATION}"'",
    }
  }'

echo

# NAME=dreamteam MEMBERS=Lebron, Jordan, Kobe LEVEL=advanced WINS=0
