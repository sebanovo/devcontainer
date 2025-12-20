# #! /bin/bash

set -e

if [ -f .env ]
then
  source .env || true
  echo "Archivo .env cargado con exito"
else
  echo "Error: .env file not found!"
fi


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

echo "Ejecutando las migraciones (si no hay cambios, no pasa nada)..."
python manage.py migrate || true

echo "Creando super usuario...$DJANGO_SUPERUSER_USERNAME"
echo "DJANGO_SUPERUSER_USERNAME=$DJANGO_SUPERUSER_USERNAME"
echo "DJANGO_SUPERUSER_EMAIL=$DJANGO_SUPERUSER_EMAIL"
echo "DJANGO_SUPERUSER_PASSWORD=$DJANGO_SUPERUSER_PASSWORD"

python manage.py shell < ../createsuperuser.py
