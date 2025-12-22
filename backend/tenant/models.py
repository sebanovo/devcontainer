from django.db import models
import uuid
import os


def alumno_foto_path(instance, filename):
    ext = filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join("alumnos", filename)


# Create your models here.
# class Alumno(models.Model):
#     nombre = models.CharField(max_length=100)
#     edad = models.IntegerField()
#     foto = models.ImageField(upload_to="alumnos/", blank=True, null=True)


class Alumno(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    foto = models.ImageField(upload_to=alumno_foto_path, blank=True, null=True)
