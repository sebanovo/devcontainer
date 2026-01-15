from datetime import date, timedelta
from ..models import Client, Domain
import os
from dotenv import load_dotenv

load_dotenv()
main_schema_domain_domain = os.getenv("MAIN_SCHEMA_DOMAIN_DOMAIN")  # example localhost
main_schema_domain = os.getenv("MAIN_SCHEMA_DOMAIN")
main_schema_name = os.getenv("MAIN_SCHEMA_NAME")
main_schema_paid_until = os.getenv("MAIN_SCHEMA_PAID_UNTIL")
main_schema_on_trial = os.getenv("MAIN_SCHEMA_ON_TRIAL")


class DomainSeeder:
    @staticmethod
    def run():
        try:
            client2 = Client.objects.get(id=2)
            Domain.objects.create(
                id=2,
                domain=f"aleman.{main_schema_domain_domain}",
                tenant=client2,
                is_primary=True,
            )

            client3 = Client.objects.get(id=3)
            Domain.objects.create(
                id=3,
                domain=f"espiritu-santo.{main_schema_domain_domain}",
                tenant=client3,
                is_primary=True,
            )

            client4 = Client.objects.get(id=3)
            Domain.objects.create(
                id=4,
                domain=f"boliviano-americano.{main_schema_domain_domain}",
                tenant=client4,
                is_primary=True,
            )

            client5 = Client.objects.get(id=3)
            Domain.objects.create(
                id=5,
                domain=f"britanico-santa-cruz.{main_schema_domain_domain}",
                tenant=client5,
                is_primary=True,
            )
        except:
            print("Hubo problema en el seeder de domain")
