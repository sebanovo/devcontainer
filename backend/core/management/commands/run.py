from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    help = "Servidor de desarrollo con --nostatic por defecto"

    def add_arguments(self, parser):
        parser.add_argument(
            "addrport",
            nargs="?",
            default="0.0.0.0:8000",
            help="Dirección y puerto (por defecto 0.0.0.0:8000)",
        )

    def handle(self, *args, **options):
        addrport = options["addrport"]
        self.stdout.write(
            self.style.SUCCESS(f"Iniciando servidor en {addrport} con --nostatic")
        )
        call_command("runserver", addrport, use_static_handler=False)
