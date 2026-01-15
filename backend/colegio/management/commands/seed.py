from django.core.management.base import BaseCommand
from ...seeders.database_seeder import DatabaseSeeder


class Command(BaseCommand):
    help = "Ejecuta los seeders para poblar la base de datos"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING("🚀 Iniciando seeding..."))
        DatabaseSeeder.run()
        self.stdout.write(self.style.SUCCESS("✅ Seeding completado."))
