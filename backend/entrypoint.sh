#! /bin/bash

set -e

echo "Esperando a PostgreSQL en $POSTGRES_HOST:$POSTGRES_PORT..."
until python ./scripts/test_conection_db.py; do
  echo "DB no disponible, reintentando..."
  sleep 1
done
echo "PostgreSQL listo."

echo "Aplicando makemigrations (si no hay cambios, no pasa nada)..."
python manage.py makemigrations || true

echo "Ejecutando las migraciones (solamente del esquema compartido)..."
python manage.py migrate_schemas --shared || true

python manage.py seed

echo "Levantando servidor de desarrollo..."
python manage.py runserver 0.0.0.0:8000