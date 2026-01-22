from datetime import date
from ..models import Invoice, Client


class InvoiceSeeder:
    @staticmethod
    def run():

        try:
            client2 = Client.objects.get(id=2)
            client3 = Client.objects.get(id=3)
            client4 = Client.objects.get(id=4)
            client5 = Client.objects.get(id=5)
            Invoice.objects.create(
                client=client2, amount=50, issued_on=date.today(), paid=True
            )

            Invoice.objects.create(
                client=client3, amount=50, issued_on=date.today(), paid=False
            )
            Invoice.objects.create(
                client=client4, amount=100, issued_on=date.today(), paid=False
            )
            Invoice.objects.create(
                client=client5, amount=200, issued_on=date.today(), paid=False
            )

        except Exception as e:
            raise e
