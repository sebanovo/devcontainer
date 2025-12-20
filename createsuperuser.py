from django.contrib.auth import get_user_model
from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent
env = environ.Env(DEBUG=(bool, False))

environ.Env.read_env(BASE_DIR / ".env")

DJANGO_SUPERUSER_USERNAME=env("DJANGO_SUPERUSER_USERNAME")
DJANGO_SUPERUSER_EMAIL=env("DJANGO_SUPERUSER_EMAIL")
DJANGO_SUPERUSER_PASSWORD=env("DJANGO_SUPERUSER_PASSWORD")


U = get_user_model()

u = U.objects.filter(username=DJANGO_SUPERUSER_USERNAME).first() or U.objects.filter(email=DJANGO_SUPERUSER_EMAIL).first()
if u:
    created = False
    u.username = DJANGO_SUPERUSER_USERNAME 
    u.email = DJANGO_SUPERUSER_EMAIL
else:
    u = U(username=DJANGO_SUPERUSER_USERNAME, email=DJANGO_SUPERUSER_EMAIL, is_staff=True, is_superuser=True, is_active=True)
    created = True

if DJANGO_SUPERUSER_PASSWORD:
    u.set_password(DJANGO_SUPERUSER_PASSWORD)
u.save()

print(f"Superuser listo: {DJANGO_SUPERUSER_USERNAME} <{DJANGO_SUPERUSER_EMAIL}> {'(creado)' if created else '(actualizado)'}")