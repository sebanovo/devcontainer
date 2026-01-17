from ..models import Client, Domain
from config.env import Env


class DomainSeeder:
    @staticmethod
    def run():
        try:
            client1 = Client.objects.get(id=1)
            Domain.objects.create(
                id=1,
                domain=Env.MAIN_SCHEMA_DOMAIN_DOMAIN,
                tenant=client1,
                is_primary=True,
            )

            client2 = Client.objects.get(id=2)
            Domain.objects.create(
                id=2,
                domain=f"aleman.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}",
                tenant=client2,
                is_primary=True,
            )

            client3 = Client.objects.get(id=3)
            Domain.objects.create(
                id=3,
                domain=f"espiritu-santo.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}",
                tenant=client3,
                is_primary=True,
            )

            client4 = Client.objects.get(id=4)
            Domain.objects.create(
                id=4,
                domain=f"boliviano-americano.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}",
                tenant=client4,
                is_primary=True,
            )

            client5 = Client.objects.get(id=5)
            Domain.objects.create(
                id=5,
                domain=f"britanico-santa-cruz.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}",
                tenant=client5,
                is_primary=True,
            )
        except Exception as e:
            raise e
