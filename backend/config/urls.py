"""
URL configuration for config project.
Adaptado a arquitectura SaaS con Django Tenants + DRF.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema")),
    path("api/", include("accounts.urls")),
    path("api/", include("tenants.urls")),
    path("api/", include("academics.urls")),
    path("api/", include("comms.urls")),
    path("api/", include("payments.urls")),
    path("api/", include("core.urls")),
    path("api/", include("document.urls")),  # ✅ rutas de document

    ]


# Servir archivos media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
