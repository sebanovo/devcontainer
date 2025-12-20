from django.core.management.base import BaseCommand
from django_seed import Seed
import random
from colegio.models import Alumno


class Command(BaseCommand):
    help = "Genera alumnos de prueba"

    def handle(self, *args, **kwargs):
        seeder = Seed.seeder()
        seeder.add_entity(
            Alumno,
            20,
            {
                "nombre": lambda x: seeder.faker.name(),
                "edad": lambda x: random.randint(6, 18),
            },
        )
        seeder.execute()
        self.stdout.write(self.style.SUCCESS("¡Alumnos sembrados con éxito!"))
