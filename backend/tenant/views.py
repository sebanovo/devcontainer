from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import get_user_model
from .models import *
from .serializers import *

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class AlumnoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]  # usar AlloAny para enviar sin token
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer
