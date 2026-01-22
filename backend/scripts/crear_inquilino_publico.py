from shared.models import Tenant, Domain

# create your public tenant
tenant = Tenant(
    schema_name="public", name="Schemas Inc.", paid_until="2016-12-05", on_trial=False
)
tenant.save()

domain = Domain()
domain.domain = "localhost"  # don't add your port or www here! on a local server you'll want to use localhost here
domain.tenant = tenant
domain.is_primary = True
domain.save()
