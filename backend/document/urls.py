from django.urls import path
from document.Logica.Nota import (
    extraer_personas, extraer_materia, extraer_curso, curso, materia,
    notas_materia, notas_curso, notas_gestion, notas_filtro, notas_insertar
)

urlpatterns = [
    path("notas/extraer/", extraer_personas, name="extraer_personas"),
    path("materias/extraer/", extraer_materia, name="extraer_materia"),
    path("cursos/extraer/", extraer_curso, name="extraer_curso"),
    path("cursos/Curso/", curso, name="curso"),
    path("cursos/Materia/", materia, name="materia"),
    path("notas/materia/", notas_materia, name="notas_materia"),
    path("notas/curso/", notas_curso, name="notas_curso"),
    path("notas/gestion/", notas_gestion, name="notas_gestion"),
    path("notas/filtro/", notas_filtro, name="notas_filtro"),
    path("notas/insertar/", notas_insertar, name="notas_insertar"),
]
