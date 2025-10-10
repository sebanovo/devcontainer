FROM python:3.12-slim

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
  curl \
  ca-certificates \
  bash \
  build-essential \
  git

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - 
RUN apt-get install -y nodejs

RUN python3 --version && pip3 --version && node --version && npm --version
