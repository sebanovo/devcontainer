from datetime import date, timedelta
from ..models import Tenant
from config.env import Env


class TenantSeeder:
    @staticmethod
    def run():
        try:
            # tenant public
            Tenant.objects.create(
                name=Env.MAIN_SCHEMA_NAME,
                schema_name=Env.MAIN_SCHEMA_DOMAIN,
                paid_until=Env.MAIN_SCHEMA_PAID_UNTIL,
                on_trial=Env.MAIN_SCHEMA_ON_TRIAL,
            )

            Tenant.objects.create(
                name="Alemán",
                schema_name="aleman",
                paid_until=date.today() + timedelta(days=15),
                on_trial=False,
            )

            Tenant.objects.create(
                name="Espíritu Santo",
                schema_name="espiritu-santo",
                paid_until=date.today() + timedelta(days=15),
                on_trial=False,
            )

            Tenant.objects.create(
                name="Boliviano Americano",
                schema_name="boliviano-americano",
                paid_until=date.today() + timedelta(days=15),
                on_trial=False,
            )

            Tenant.objects.create(
                name="Brítanico Santa Cruz",
                schema_name="britanico-santa-cruz",
                paid_until=date.today() + timedelta(days=15),
                on_trial=False,
            )
        except Exception as e:
            raise e
