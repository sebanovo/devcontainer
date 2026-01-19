FROM node:20-bookworm

# Copiar proyecto
COPY ./frontend /app

# Copiar variables de entorno
COPY .env .env

WORKDIR /app

# Instalar dependencias
RUN npm install

# Exponer el puerto en el que React/Vite corre (por defecto 5173)
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo de Vite con hot reload
CMD ["npm", "run", "dev"]