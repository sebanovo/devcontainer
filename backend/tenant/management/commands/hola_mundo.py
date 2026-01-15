from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Muestra un ¡Hola Mundo!"

    def handle(self, *args, **kwargs):
        print("hola mundo")
