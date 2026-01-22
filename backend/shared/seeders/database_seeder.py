from .tenant_seeder import TenantSeeder
from .domain_seeder import DomainSeeder
from .plan_seeder import PlanSeeder
from .subscription_seeder import SubscriptionSeeder
from .invoice_seeder import InvoiceSeeder
from .alumno_seeder import AlumnoSeeder
from .user_seeder import UserSeeder


class DatabaseSeeder:
    @staticmethod
    def run(stdout, style):
        seeders = [
            TenantSeeder,
            DomainSeeder,
            PlanSeeder,
            SubscriptionSeeder,
            InvoiceSeeder,
            UserSeeder,
            AlumnoSeeder,
        ]

        try:
            for seeder in seeders:
                stdout.write(style.WARNING(f"Seeding {seeder.__name__}..."))
                seeder.run()
                stdout.write(style.SUCCESS("Seeding completado."))
        except Exception as e:
            raise e
