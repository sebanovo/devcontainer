from datetime import date, timedelta
from ..models import Alumno


class AlumnoSeeder:
    @staticmethod
    def run():
        try:
            Alumno.objects.create(id=1, nombre="Sebastian Cespedes Rodas", edad=21)
            Alumno.objects.create(id=2, nombre="Lucas Matias Flores", edad=21)
            Alumno.objects.create(id=3, nombre="Mariana Morales Jimenez", edad=21)
            Alumno.objects.create(id=4, nombre="Gabriela Gonzales Mamani", edad=21)

        except Exception as e:
            raise e
