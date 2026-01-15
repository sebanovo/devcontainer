from .client_seeder import ClientSeeder
from .domain_seeder import DomainSeeder
from .plan_seeder import PlanSeeder
from .subscription_seeder import SubscriptionSeeder
from .invoice_seeder import InvoiceSeeder
from .alumno_seeder import AlumnoSeeder


class DatabaseSeeder:
    @staticmethod
    def run():
        seeders = [
            ClientSeeder,
            DomainSeeder,
            PlanSeeder,
            SubscriptionSeeder,
            InvoiceSeeder,
            AlumnoSeeder,
        ]

        for seeder in seeders:
            print(f"Seeding {seeder.__name__}...")
            seeder.run()
        print("✅ Database seeding completed.")
