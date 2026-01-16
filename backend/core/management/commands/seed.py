from django.core.management.base import BaseCommand
from colegio.seeders.database_seeder import DatabaseSeeder


class Command(BaseCommand):
    help = "Ejecuta los seeders para poblar la base de datos"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING("🚀 Iniciando seeding..."))

        try:
            DatabaseSeeder.run(self.stdout, self.style)

            self.stdout.write(self.style.SUCCESS("✅ Seeding completado."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌Error: {e}"))
