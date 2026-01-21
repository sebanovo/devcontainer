from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r"groups", UserViewSet, "tenant-groups")
router.register(r"users", UserViewSet, "tenant-users")
router.register(r"alumnos", AlumnoViewSet, "tenant-alumnos")
