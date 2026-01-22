from django.db import models

# Create your models here.

from django.db import models
from django_tenants.models import TenantMixin, DomainMixin


class Client(TenantMixin):
    name = models.CharField(max_length=100)
    paid_until = models.DateField()
    on_trial = models.BooleanField()
    created_on = models.DateField(auto_now_add=True)

    # default true, schema will be automatically created and synced when it is saved
    auto_drop_schema = True
    auto_create_schema = True


class Domain(DomainMixin):
    pass


class Plan(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    max_students = models.IntegerField()
    max_teachers = models.IntegerField()
    max_storage_mb = models.IntegerField()


class Subscription(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    active = models.BooleanField(default=True)


# Facturacion / pagos
class Invoice(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)  # cantidad
    issued_on = models.DateField(auto_now_add=True)  # problemas
    paid = models.BooleanField(default=False)  # pagada


class Alumno(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    foto = models.ImageField(upload_to="alumnos/", blank=True, null=True)
