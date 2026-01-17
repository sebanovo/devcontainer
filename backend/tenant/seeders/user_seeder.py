from django.contrib.auth import get_user_model
from django_tenants.utils import schema_context
from config.env import Env


class UserSeeder:
    @staticmethod
    def create_tenant_user(schema_name, username, email, password):
        with schema_context(schema_name):
            User = get_user_model()
            if not User.objects.filter(username=username).exists():
                User.objects.create_user(
                    username=username, email=email, password=password
                )
            else:
                raise Exception(
                    f"️Superusuario {username} ya existe en tenant {schema_name}"
                )

    @staticmethod
    def run():
        try:
            # Aleman
            UserSeeder.create_tenant_user(
                "aleman", "messi", "messi@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "aleman", "ronaldo", "ronaldo@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "aleman", "alonso", "alonso@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "aleman", "zidane", "zidane@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "aleman", "alvarez", "alvarez@gmail.com", "password"
            )

            # Espiritu Santo
            UserSeeder.create_tenant_user(
                "espiritu-santo", "messi", "messi@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "espiritu-santo", "ronaldo", "ronaldo@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "espiritu-santo", "alonso", "alonso@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "espiritu-santo", "zidane", "zidane@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "espiritu-santo", "alvarez", "alvarez@gmail.com", "password"
            )

            # Boliviano Americano
            UserSeeder.create_tenant_user(
                "boliviano-americano", "messi", "messi@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "boliviano-americano", "ronaldo", "ronaldo@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "boliviano-americano", "alonso", "alonso@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "boliviano-americano", "zidane", "zidane@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "boliviano-americano", "alvarez", "alvarez@gmail.com", "password"
            )

            # Britanico Santa Cruz
            UserSeeder.create_tenant_user(
                "britanico-santa-cruz", "messi", "messi@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "britanico-santa-cruz", "ronaldo", "ronaldo@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "britanico-santa-cruz", "alonso", "alonso@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "britanico-santa-cruz", "zidane", "zidane@gmail.com", "password"
            )
            UserSeeder.create_tenant_user(
                "britanico-santa-cruz", "alvarez", "alvarez@gmail.com", "password"
            )
        except Exception as e:
            raise e
