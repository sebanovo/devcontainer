from django.shortcuts import render
from .serializers import UserRegistrationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# Create your views here.


@api_view(["POST"])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework import viewsets
from .models import Alumno
from .serializers import AlumnoSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class AlumnoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]  # usar AlloAny para enviar sin token
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer
