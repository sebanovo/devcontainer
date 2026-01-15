from datetime import date, timedelta
from ..models import Subscription, Client, Plan


class SubscriptionSeeder:
    @staticmethod
    def run():
        try:
            client2 = Client.objects.get(id=2)
            plan1 = Plan.objects.get(name="Básico")
            client3 = Client.objects.get(id=3)
            plan2 = Plan.objects.get(name="Estándar")
            client4 = Client.objects.get(id=4)
            plan3 = Plan.objects.get(name="Premium")
            client5 = Client.objects.get(id=5)

            Subscription.objects.create(
                id=1,
                client=client2,
                plan=plan1,
                start_date=date.today(),
                end_date=date.today() + timedelta(days=30),
                active=True,
            )

            Subscription.objects.create(
                id=2,
                client=client3,
                plan=plan1,
                start_date=date.today(),
                end_date=date.today() + timedelta(days=30),
                active=True,
            )

            Subscription.objects.create(
                id=3,
                client=client4,
                plan=plan2,
                start_date=date.today(),
                end_date=date.today() + timedelta(days=30),
                active=True,
            )
            Subscription.objects.create(
                id=4,
                client=client5,
                plan=plan3,
                start_date=date.today(),
                end_date=date.today() + timedelta(days=30),
                active=True,
            )

        except Exception as e:
            raise e
