from django.db import models

# -------------------------------
# Clases base necesarias antes de usarse
# -------------------------------

class Curso(models.Model):
    nombre = models.CharField(max_length=80)

    def __str__(self):
        return self.nombre

class Materia(models.Model):
    nombre = models.CharField(max_length=80)

    def __str__(self):
        return self.nombre

class Persona(models.Model):
    nombre = models.CharField(max_length=80)
    apellido_paterno = models.CharField(max_length=80)
    apellido_materno = models.CharField(max_length=80)
    ci = models.CharField(max_length=80)

    def __str__(self):
        return f"{self.nombre} {self.apellido_paterno} {self.apellido_materno}"

# -------------------------------
# Modelo de notas centralizadas
# -------------------------------

class SentralizadoNota(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name="notas")
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE, related_name="notas")
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name="notas")
    gestion = models.IntegerField()  # Solo año

    # Trimestre 1
    t1_f1 = models.FloatField(null=True, blank=True)
    t1_f2 = models.FloatField(null=True, blank=True)
    t1_f3 = models.FloatField(null=True, blank=True)
    t1_promedio = models.FloatField(null=True, blank=True)
    t1_auto_evaluacion = models.FloatField(null=True, blank=True)

    # Trimestre 2
    t2_f1 = models.FloatField(null=True, blank=True)
    t2_f2 = models.FloatField(null=True, blank=True)
    t2_f3 = models.FloatField(null=True, blank=True)
    t2_promedio = models.FloatField(null=True, blank=True)
    t2_auto_evaluacion = models.FloatField(null=True, blank=True)

    # Trimestre 3
    t3_f1 = models.FloatField(null=True, blank=True)
    t3_f2 = models.FloatField(null=True, blank=True)
    t3_f3 = models.FloatField(null=True, blank=True)
    t3_promedio = models.FloatField(null=True, blank=True)
    t3_auto_evaluacion = models.FloatField(null=True, blank=True)

    # Promedio anual
    promedio_anual = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.persona} - {self.materia.nombre} ({self.curso.nombre}) [{self.gestion}]"

# -------------------------------
# Otros modelos
# -------------------------------

class Colegio(models.Model):
    nombre = models.CharField(max_length=80)
    direccion = models.CharField(max_length=80)
    director = models.CharField(max_length=80)
    ubicacion = models.CharField(max_length=80)

    def __str__(self):
        return self.nombre

class Tramites(models.Model):
    nombre = models.CharField(max_length=80)
    descripcion = models.CharField(max_length=80)

    def __str__(self):
        return self.nombre

class Rol(models.Model):
    nombre = models.CharField(max_length=80)
    descripcion = models.CharField(max_length=80)

    def __str__(self):
        return self.nombre

class Documento(models.Model):
    tipo_documento = models.CharField(max_length=80, unique=True)
    descripcion = models.CharField(max_length=80)
    rutas = models.CharField(max_length=150, default="/ruta/por/defecto")

    def __str__(self):
        return self.tipo_documento

# -------------------------------
# Relaciones ManyToMany a través de modelos
# -------------------------------

class PersonaDocumento(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name="documentos")
    documento = models.ForeignKey(Documento, on_delete=models.CASCADE, related_name="persona_documentos")

    def __str__(self):
        return f"{self.persona} - {self.documento.tipo_documento}"

class PersonaRol(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name="roles_persona")
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, related_name="persona_roles_rel")

    def __str__(self):
        return f"{self.persona} - {self.rol.nombre}"

class TramitePersona(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name="tramites_persona")
    tramite = models.ForeignKey(Tramites, on_delete=models.CASCADE, related_name="persona_tramites")

    def __str__(self):
        return f"{self.persona} - {self.tramite.nombre}"

class CursoPersona(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name="cursos_persona")
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name="persona_cursos")

    def __str__(self):
        return f"{self.persona} - {self.curso.nombre}"
