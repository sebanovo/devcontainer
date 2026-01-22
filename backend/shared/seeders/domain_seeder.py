from ..models import Tenant, Domain
from config.env import Env


class DomainSeeder:
    @staticmethod
    def run():
        try:
            # Dominio public
            tenant1 = Tenant.objects.get(id=1)
            Domain.objects.create(
                domain=Env.MAIN_SCHEMA_DOMAIN_DOMAIN,
                tenant=tenant1,
                is_primary=True,
            )

            Domain.objects.create(
                domain=f"{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.nip.io",
                tenant=tenant1,
                is_primary=False,
            )

            Domain.objects.create(
                domain=f"{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.sslip.io",
                tenant=tenant1,
                is_primary=False,
            )

            tenant2 = Tenant.objects.get(id=2)
            Domain.objects.create(
                domain=f"aleman.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}",
                tenant=tenant2,
                is_primary=True,
            )

            Domain.objects.create(
                domain=f"aleman.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.nip.io",
                tenant=tenant2,
                is_primary=False,
            )

            Domain.objects.create(
                domain=f"aleman.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.sslip.io",
                tenant=tenant2,
                is_primary=False,
            )

            tenant3 = Tenant.objects.get(id=3)
            Domain.objects.create(
                domain=f"espiritu-santo.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}",
                tenant=tenant3,
                is_primary=True,
            )

            Domain.objects.create(
                domain=f"espiritu-santo.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.nip.io",
                tenant=tenant3,
                is_primary=False,
            )

            Domain.objects.create(
                domain=f"espiritu-santo.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.sslip.io",
                tenant=tenant3,
                is_primary=False,
            )

            tenant4 = Tenant.objects.get(id=4)
            Domain.objects.create(
                domain=f"boliviano-americano.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}",
                tenant=tenant4,
                is_primary=True,
            )

            Domain.objects.create(
                domain=f"boliviano-americano.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.nip.io",
                tenant=tenant4,
                is_primary=False,
            )

            Domain.objects.create(
                domain=f"boliviano-americano.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.sslip.io",
                tenant=tenant4,
                is_primary=False,
            )

            tenant5 = Tenant.objects.get(id=5)
            Domain.objects.create(
                domain=f"britanico-santa-cruz.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}",
                tenant=tenant5,
                is_primary=True,
            )
            Domain.objects.create(
                domain=f"britanico-santa-cruz.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.nip.io",
                tenant=tenant5,
                is_primary=False,
            )

            Domain.objects.create(
                domain=f"britanico-santa-cruz.{Env.MAIN_SCHEMA_DOMAIN_DOMAIN}.sslip.io",
                tenant=tenant5,
                is_primary=False,
            )
        except Exception as e:
            raise e
