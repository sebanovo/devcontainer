from django.contrib import admin
from django_tenants.admin import TenantAdminMixin

from .models import Client, Domain


@admin.register(Client)
class ClientAdmin(TenantAdminMixin, admin.ModelAdmin):
    list_display = ("name", "paid_until")


@admin.register(Domain)
class DomainAdmin(TenantAdminMixin, admin.ModelAdmin):
    list_display = ("domain", "tenant_id")
