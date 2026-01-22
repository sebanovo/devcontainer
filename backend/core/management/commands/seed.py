from django.core.management.base import BaseCommand
from shared.seeders.database_seeder import DatabaseSeeder as PublicDatabaseSeeder
from tenant.seeders.database_seeder import DatabaseSeeder as TenantDatabaseSeeder


class Command(BaseCommand):
    help = "Ejecuta los seeders para poblar la base de datos"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING("🚀 Iniciando seeding..."))

        try:
            PublicDatabaseSeeder.run(self.stdout, self.style)

            self.stdout.write(self.style.SUCCESS("✅ Seeding completado."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌Error: {e}"))

        self.stdout.write(self.style.WARNING("🚀 Iniciando seeding en Tenants..."))

        try:
            TenantDatabaseSeeder.run(self.stdout, self.style)

            self.stdout.write(self.style.SUCCESS("✅ Seeding completado en Tenants."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌Error: {e}"))
