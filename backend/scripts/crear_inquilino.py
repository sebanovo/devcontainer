from colegio.models import Client, Domain

# create your public tenant
tenant = Client(
    schema_name="simon_pedro_ii",
    name="Simon Pedro II",
    paid_until="2016-12-05",
    on_trial=False,
)
tenant.save()

domain = Domain()
domain.domain = "simonpedroii.localhost"  # importante añadirle el mismo dominio
domain.tenant = tenant
domain.is_primary = True
domain.save()
