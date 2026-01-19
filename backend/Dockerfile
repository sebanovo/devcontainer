FROM python:3.12-slim

# Crear directorio app y dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Copiar proyecto
COPY ./backend /app

# Copiar variables de entorno
COPY .env .env

WORKDIR /app

RUN pip install --no-cache-dir -r ./requirements.txt

# Exponer puerto
EXPOSE 8000

# Dar permisos
RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]