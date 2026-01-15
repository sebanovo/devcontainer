from django.contrib.auth.models import User
from django_tenants.utils import schema_context
from config.env import Env


class UserSeeder:
    @staticmethod
    def create_tenant_superuser(schema_name, username, email, password):
        with schema_context(schema_name):
            if not User.objects.filter(username=username).exists():
                User.objects.create_superuser(
                    username=username, email=email, password=password
                )
            else:
                print(f"️Superusuario {username} ya existe en tenant {schema_name}")

    @staticmethod
    def run():
        try:
            UserSeeder.create_tenant_superuser(
                "public",
                Env.DJANGO_SUPERUSER_USERNAME,
                Env.DJANGO_SUPERUSER_EMAIL,
                Env.DJANGO_SUPERUSER_PASSWORD,
            )
            UserSeeder.create_tenant_superuser(
                "aleman", "aleman", "aleman@gmail.com", "password"
            )
            UserSeeder.create_tenant_superuser(
                "espiritu-santo",
                "espiritu santo",
                "espiritusanto@gmail.com",
                "password",
            )
            UserSeeder.create_tenant_superuser(
                "boliviano-americano",
                "boliviano americano",
                "bolivianoamericano@gmail.com",
                "password",
            )
            UserSeeder.create_tenant_superuser(
                "britanico-santa-cruz",
                "britanico santa cruz",
                "britanicosantacruz@gmail.com",
                "password",
            )
        except:
            print("Hubo problema en el seeder de user")
