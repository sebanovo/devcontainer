#! /bin/bash

set -e

if [ ! -f .env ]; then
  echo "Error: .env file not found!"
  exit 1
fi

source .env 
echo "Archivo .env cargado con éxito"

cd backend

echo "Instalar Dependencias..."
pip install --no-cache-dir -r ./requirements.txt

echo "Esperando a PostgreSQL en $POSTGRES_HOST:$POSTGRES_PORT..."
until python ../wait_for_db.py; do
  echo "DB no disponible, reintentando..."
  sleep 1
done
echo "PostgreSQL listo."

echo "Aplicando makemigrations (si no hay cambios, no pasa nada)..."
python manage.py makemigrations || true

echo "Ejecutando las migraciones (solamente del esquema compartido)..."
python manage.py migrate_schemas --shared || true

echo "Creando el Esquema principal..."
python manage.py create_tenant \
 --domain-domain=$MAIN_SCHEMA_DOMAIN_DOMAIN \
 --schema_name=$MAIN_SCHEMA_DOMAIN \
 --name=$MAIN_SCHEMA_NAME \
 --paid_until=$MAIN_SCHEMA_PAID_UNTIL \
 --on_trial=$MAIN_SCHEMA_ON_TRIAL \
 --domain-is_primary=True

echo "Creando super usuario...$DJANGO_SUPERUSER_USERNAME"
DJANGO_SUPERUSER_USERNAME=$DJANGO_SUPERUSER_USERNAME
DJANGO_SUPERUSER_EMAIL=$DJANGO_SUPERUSER_EMAIL
DJANGO_SUPERUSER_PASSWORD=$DJANGO_SUPERUSER_PASSWORD

echo "Creando super usuario"
export DJANGO_SUPERUSER_USERNAME
export DJANGO_SUPERUSER_EMAIL
export DJANGO_SUPERUSER_PASSWORD
python manage.py createsuperuser --noinput


