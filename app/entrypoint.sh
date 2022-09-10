#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi
python manage.py collectstatic --noinput
python manage.py migrate
uwsgi --socket :8000 --workers 4 --master --enable-threads --plugins python3 --module app.wsgi
exec "$@"
