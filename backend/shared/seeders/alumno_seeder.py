from ..models import Alumno


class AlumnoSeeder:
    @staticmethod
    def run():
        try:
            Alumno.objects.create(nombre="Sebastian Cespedes Rodas", edad=21)
            Alumno.objects.create(nombre="Lucas Matias Flores", edad=21)
            Alumno.objects.create(nombre="Mariana Morales Jimenez", edad=21)
            Alumno.objects.create(nombre="Gabriela Gonzales Mamani", edad=21)

        except Exception as e:
            raise e
