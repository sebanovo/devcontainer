from django.urls import path, include
from .routers import router
from .views import TenantRegistrationView

urlpatterns = [
    path("", include(router.urls)),
    path("tenant/", include("tenant.urls")),
    path("register-tenant/", TenantRegistrationView.as_view(), name="register-tenant"),
]
