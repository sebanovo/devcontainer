from datetime import date, timedelta
from ..models import Client


class ClientSeeder:
    @staticmethod
    def run():
        try:

            Client.objects.create(
                id=2,
                name="Alemán",
                schema_name="aleman",
                paid_until=date.today() + timedelta(days=15),
                on_trial=False,
            )

            Client.objects.create(
                id=3,
                name="Espíritu Santo",
                schema_name="espiritu-santo",
                paid_until=date.today() + timedelta(days=15),
                on_trial=False,
            )

            Client.objects.create(
                id=4,
                name="Boliviano Americano",
                schema_name="boliviano-americano",
                paid_until=date.today() + timedelta(days=15),
                on_trial=False,
            )

            Client.objects.create(
                id=5,
                name="Brítanico Santa Cruz",
                schema_name="britanico-santa-cruz",
                paid_until=date.today() + timedelta(days=15),
                on_trial=False,
            )
        except:
            print("Hubo problema en el seeder de client")
