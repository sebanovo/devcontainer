from ..models import Plan


class PlanSeeder:
    @staticmethod
    def run():
        try:
            Plan.objects.create(
                id=1,
                name="Básico",
                description="Hasta 100 alumnos",
                price=50,
                max_students=100,
                max_teachers=10,
                max_storage_mb=500,
            )

            Plan.objects.create(
                id=2,
                name="Estándar",
                description="Hasta 500 alumnos",
                price=100,
                max_students=500,
                max_teachers=25,
                max_storage_mb=1000,
            )

            Plan.objects.create(
                id=3,
                name="Premium",
                description="Hasta 1000 alumnos",
                price=200,
                max_students=1000,
                max_teachers=50,
                max_storage_mb=2000,
            )

        except Exception as e:
            raise e
