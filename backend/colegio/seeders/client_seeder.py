from datetime import date, timedelta
from ..models import Client
from config.env import Env


class ClientSeeder:
    @staticmethod
    def run():
        try:
            Client.objects.create(
                id=1,
                name=Env.MAIN_SCHEMA_NAME,
                schema_name=Env.MAIN_SCHEMA_DOMAIN,
                paid_until=Env.MAIN_SCHEMA_PAID_UNTIL,
                on_trial=Env.MAIN_SCHEMA_ON_TRIAL,
            )

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
        except Exception as e:
            raise e
