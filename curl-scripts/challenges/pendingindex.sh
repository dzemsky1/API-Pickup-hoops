#!/bin/sh

API="http://localhost:4741"
URL_PATH="/pending-challenges"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
