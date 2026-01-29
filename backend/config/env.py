from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env(DEBUG=(bool, True))
environ.Env.read_env(BASE_DIR / ".env")


# import os
# from dotenv import load_dotenv

# load_dotenv()


""""
¡IMPORTANT! 
Asegurarse de eliminar los "espacios" de las
cadenas para que no halla espacios bugs
ejemplos de bug "localhost " <- tiene un espacio
"""


class Env:
    # Django
    SECRET_KEY = env.str("SECRET_KEY").strip()
    DEBUG = env.bool("DEBUG")

    # Hosts y CORS
    ALLOWED_HOSTS = env.str("ALLOWED_HOSTS").strip().split(",")
    CORS_ALLOW_ALL_ORIGINS = env.bool("CORS_ALLOW_ALL_ORIGINS")

    # Base de datos
    POSTGRES_DB = env.str("POSTGRES_DB").strip()
    POSTGRES_USER = env.str("POSTGRES_USER").strip()
    POSTGRES_PASSWORD = env.str("POSTGRES_PASSWORD").strip()
    POSTGRES_HOST = env.str("POSTGRES_HOST").strip()
    POSTGRES_PORT = env.str("POSTGRES_PORT").strip()

    # Esquema principal
    MAIN_SCHEMA_DOMAIN_DOMAIN = env.str("MAIN_SCHEMA_DOMAIN_DOMAIN").strip()
    MAIN_SCHEMA_DOMAIN = env.str("MAIN_SCHEMA_DOMAIN").strip()
    MAIN_SCHEMA_NAME = env.str("MAIN_SCHEMA_NAME").strip()
    MAIN_SCHEMA_PAID_UNTIL = env.str("MAIN_SCHEMA_PAID_UNTIL").strip()
    MAIN_SCHEMA_ON_TRIAL = env.bool("MAIN_SCHEMA_ON_TRIAL")

    # Superusuario
    DJANGO_SUPERUSER_USERNAME = env.str("DJANGO_SUPERUSER_USERNAME").strip()
    DJANGO_SUPERUSER_EMAIL = env.str("DJANGO_SUPERUSER_EMAIL").strip()
    DJANGO_SUPERUSER_PASSWORD = env.str("DJANGO_SUPERUSER_PASSWORD").strip()


# print("\n======= DEBUG ENV VARIABLES =======\n")

# print("SECRET_KEY                :", Env.SECRET_KEY, "gei", "puto")
# print("DEBUG                     :", Env.DEBUG)

# print("\n--- HOSTS & CORS ---")
# print("ALLOWED_HOSTS              :", Env.ALLOWED_HOSTS)
# print("CORS_ALLOW_ALL_ORIGINS     :", Env.CORS_ALLOW_ALL_ORIGINS)

# print("\n--- DATABASE ---")
# print("POSTGRES_DB                :", Env.POSTGRES_DB)
# print("POSTGRES_USER              :", Env.POSTGRES_USER)
# print("POSTGRES_PASSWORD          :", Env.POSTGRES_PASSWORD)
# print("POSTGRES_HOST              :", Env.POSTGRES_HOST)
# print("POSTGRES_PORT              :", Env.POSTGRES_PORT)

# print("\n--- MAIN SCHEMA ---")
# print("MAIN_SCHEMA_DOMAIN_DOMAIN  :", Env.MAIN_SCHEMA_DOMAIN_DOMAIN)
# print("MAIN_SCHEMA_DOMAIN         :", Env.MAIN_SCHEMA_DOMAIN)
# print("MAIN_SCHEMA_NAME           :", Env.MAIN_SCHEMA_NAME)
# print("MAIN_SCHEMA_PAID_UNTIL     :", Env.MAIN_SCHEMA_PAID_UNTIL)
# print("MAIN_SCHEMA_ON_TRIAL       :", Env.MAIN_SCHEMA_ON_TRIAL)

# print("\n--- SUPERUSER ---")
# print("DJANGO_SUPERUSER_USERNAME  :", Env.DJANGO_SUPERUSER_USERNAME)
# print("DJANGO_SUPERUSER_EMAIL     :", Env.DJANGO_SUPERUSER_EMAIL)
# print("DJANGO_SUPERUSER_PASSWORD  :", Env.DJANGO_SUPERUSER_PASSWORD)

# print("\n===================================\n")
