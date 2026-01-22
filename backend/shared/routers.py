from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"clients", ClientViewSet)
router.register(r"domains", DomainViewSet)
router.register(r"plans", PlanViewSet)
router.register(r"subscriptions", SubscriptionViewSet)
router.register(r"invoces", InvoiceViewSet)
router.register(r"alumnos", AlumnoViewSet)
