from django.contrib.auth.models import Group
from django_tenants.utils import schema_context
from config.env import Env


class GroupSeeder:
    @staticmethod
    def create_tenant_group(schema_name, name):
        with schema_context(schema_name):
            if Group.objects.filter(name=name).exists():
                raise Exception(f"Group {name} ya existe en tenant {schema_name}")

            Group.objects.create(name=name)

    @staticmethod
    def run():
        try:
            # Aleman
            GroupSeeder.create_tenant_group("aleman", "profesor")
            GroupSeeder.create_tenant_group("aleman", "estudiante")
            GroupSeeder.create_tenant_group("aleman", "tutor")
            GroupSeeder.create_tenant_group("aleman", "directivo")

            # Espiritu Santo
            GroupSeeder.create_tenant_group("espiritu-santo", "profesor")
            GroupSeeder.create_tenant_group("espiritu-santo", "estudiante")
            GroupSeeder.create_tenant_group("espiritu-santo", "tutor")
            GroupSeeder.create_tenant_group("espiritu-santo", "directivo")

            # Boliviano Americano
            GroupSeeder.create_tenant_group("boliviano-americano", "profesor")
            GroupSeeder.create_tenant_group("boliviano-americano", "estudiante")
            GroupSeeder.create_tenant_group("boliviano-americano", "tutor")
            GroupSeeder.create_tenant_group("boliviano-americano", "directivo")

            # Britanico Santa Cruz
            GroupSeeder.create_tenant_group("britanico-santa-cruz", "profesor")
            GroupSeeder.create_tenant_group("britanico-santa-cruz", "estudiante")
            GroupSeeder.create_tenant_group("britanico-santa-cruz", "tutor")
            GroupSeeder.create_tenant_group("britanico-santa-cruz", "directivo")

        except Exception as e:
            raise e
