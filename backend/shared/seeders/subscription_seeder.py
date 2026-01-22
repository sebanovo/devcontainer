from datetime import date, timedelta
from ..models import Subscription, Tenant, Plan


class SubscriptionSeeder:
    @staticmethod
    def run():
        try:
            tenant2 = Tenant.objects.get(id=2)
            plan1 = Plan.objects.get(name="Básico")
            tenant3 = Tenant.objects.get(id=3)
            plan2 = Plan.objects.get(name="Estándar")
            tenant4 = Tenant.objects.get(id=4)
            plan3 = Plan.objects.get(name="Premium")
            tenant5 = Tenant.objects.get(id=5)

            Subscription.objects.create(
                tenant=tenant2,
                plan=plan1,
                start_date=date.today(),
                end_date=date.today() + timedelta(days=30),
                active=True,
            )

            Subscription.objects.create(
                tenant=tenant3,
                plan=plan1,
                start_date=date.today(),
                end_date=date.today() + timedelta(days=30),
                active=True,
            )

            Subscription.objects.create(
                tenant=tenant4,
                plan=plan2,
                start_date=date.today(),
                end_date=date.today() + timedelta(days=30),
                active=True,
            )
            Subscription.objects.create(
                tenant=tenant5,
                plan=plan3,
                start_date=date.today(),
                end_date=date.today() + timedelta(days=30),
                active=True,
            )

        except Exception as e:
            raise e
