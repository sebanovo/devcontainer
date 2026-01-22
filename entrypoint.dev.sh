#! /bin/bash

set -e

if [ ! -f .env ]; then
  echo "Error: .env file not found!"
  exit 1
fi

source .env 
echo "Archivo .env cargado con éxito"

cd backend

echo "Instalar Dependencias...(backend)"
pip install --no-cache-dir -r ./requirements.txt

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

cd ../frontend
echo "Instalar Dependencias...(frontend)"
npm install