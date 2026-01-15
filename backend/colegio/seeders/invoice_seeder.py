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
                id=1, client=client2, amount=50, issued_on=date.today(), paid=True
            )

            Invoice.objects.create(
                id=2, client=client3, amount=50, issued_on=date.today(), paid=False
            )
            Invoice.objects.create(
                id=3, client=client4, amount=100, issued_on=date.today(), paid=False
            )
            Invoice.objects.create(
                id=4, client=client5, amount=200, issued_on=date.today(), paid=False
            )

        except:
            print("Hubo problema en el seeder de invoice")
