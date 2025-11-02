#!/bin/bash
# /usr/local/bin/healthcheckdb.sh

for i in {1..10}; do
  MYSQL_PWD="$MYSQL_PASSWORD" mysqladmin ping -h 127.0.0.1 -u "$MYSQL_USER" >/dev/null 2>&1
  if [ $? -eq 0 ]; then
    exit 0
  fi
  sleep 2
done

exit 1
