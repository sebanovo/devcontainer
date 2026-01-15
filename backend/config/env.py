# from pathlib import Path
# import environ

# BASE_DIR = Path(__file__).resolve().parent.parent
# env = environ.Env(DEBUG=(bool, True))
# environ.Env.read_env(BASE_DIR.parent / ".env")


# class Env:
#     SECRET_KEY = env("SECRET_KEY")

import os
from dotenv import load_dotenv

load_dotenv()


class Env:
    # Django
    SECRET_KEY = os.getenv("SECRET_KEY")
    DEBUG = os.getenv("DEBUG", "True") == "True"

    # Hosts y CORS
    DEFAULT_TENANT_SCHEMA = os.getenv("DEFAULT_TENANT_SCHEMA")
    ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS")
    CORS_ALLOW_ALL_ORIGINS = os.getenv("CORS_ALLOW_ALL_ORIGINS") == "True"
    CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_TRUSTED_ORIGINS").split(",")
    LANGUAGE_CODE = os.getenv("LANGUAGE_CODE", "es")
    TIME_ZONE = os.getenv("TIME_ZONE", "UTC")

    # Base de datos
    POSTGRES_DB = os.getenv("POSTGRES_DB")
    POSTGRES_USER = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_HOST = os.getenv("POSTGRES_HOST")
    POSTGRES_PORT = os.getenv("POSTGRES_PORT")

    # API
    VITE_API_URL = os.getenv("VITE_API_URL")

    # Esquema principal
    MAIN_SCHEMA_DOMAIN_DOMAIN = os.getenv("MAIN_SCHEMA_DOMAIN_DOMAIN")
    MAIN_SCHEMA_DOMAIN = os.getenv("MAIN_SCHEMA_DOMAIN")
    MAIN_SCHEMA_NAME = os.getenv("MAIN_SCHEMA_NAME")
    MAIN_SCHEMA_PAID_UNTIL = os.getenv("MAIN_SCHEMA_PAID_UNTIL")
    MAIN_SCHEMA_ON_TRIAL = os.getenv("MAIN_SCHEMA_ON_TRIAL", "False") == "True"

    # Superusuario
    DJANGO_SUPERUSER_USERNAME = os.getenv("DJANGO_SUPERUSER_USERNAME")
    DJANGO_SUPERUSER_EMAIL = os.getenv("DJANGO_SUPERUSER_EMAIL")
    DJANGO_SUPERUSER_PASSWORD = os.getenv("DJANGO_SUPERUSER_PASSWORD")
