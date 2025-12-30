from django.db import models
import uuid
import os


def alumno_foto_path(instance, filename):
    ext = filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join("alumnos", filename)


class Alumno(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    foto = models.ImageField(
        upload_to=alumno_foto_path, blank=True, null=True
    )  # upload_to="alumnos/"

    def __str__(self):
        return f"{self.nombre}"
