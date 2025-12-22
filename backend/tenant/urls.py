from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import AlumnoViewSet

router = routers.DefaultRouter()
router.register(r"alumnos", AlumnoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
