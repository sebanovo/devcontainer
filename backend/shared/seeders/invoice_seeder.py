from datetime import date
from ..models import Invoice, Tenant


class InvoiceSeeder:
    @staticmethod
    def run():

        try:
            tenant2 = Tenant.objects.get(id=2)
            tenant3 = Tenant.objects.get(id=3)
            tenant4 = Tenant.objects.get(id=4)
            tenant5 = Tenant.objects.get(id=5)
            Invoice.objects.create(
                tenant=tenant2, amount=50, issued_on=date.today(), paid=True
            )

            Invoice.objects.create(
                tenant=tenant3, amount=50, issued_on=date.today(), paid=False
            )
            Invoice.objects.create(
                tenant=tenant4, amount=100, issued_on=date.today(), paid=False
            )
            Invoice.objects.create(
                tenant=tenant5, amount=200, issued_on=date.today(), paid=False
            )

        except Exception as e:
            raise e
