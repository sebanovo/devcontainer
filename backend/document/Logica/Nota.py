from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import CursoPersona, Curso, Materia, SentralizadoNota, Persona
from django.db.models import Q
from django.db import transaction

# ======================================================
# 🔹 Extraer personas según curso o nombre
# ======================================================
@api_view(["GET"])
def extraer_personas(request):
    nombre_curso = request.GET.get("curso", None)
    nombre_persona = request.GET.get("persona", None)

    queryset = CursoPersona.objects.select_related("persona", "curso").all()
    filtros = Q()
    if nombre_curso:
        filtros &= Q(curso__nombre__icontains=nombre_curso)
    if nombre_persona:
        filtros &= Q(persona__nombre__icontains=nombre_persona)
    if filtros:
        queryset = queryset.filter(filtros)

    # 🔹 Ordenar por apellido paterno A → Z
    queryset = queryset.order_by("persona__apellido_paterno", "persona__apellido_materno", "persona__nombre")

    data = [
        {
            "persona_id": cp.persona.id,
            "nombre": cp.persona.nombre,
            "apellido_paterno": cp.persona.apellido_paterno,
            "apellido_materno": cp.persona.apellido_materno,
            "curso_id": cp.curso.id,
            "curso_nombre": cp.curso.nombre,
        }
        for cp in queryset
    ]
    return Response(data)

# ======================================================
# 🔹 Extraer materias y cursos
# ======================================================
@api_view(["GET"])
def extraer_materia(request):
    nombre_materia = request.GET.get("materia", None)
    queryset = Materia.objects.all()
    if nombre_materia:
        queryset = queryset.filter(nombre__icontains=nombre_materia)
    data = [{"materia_id": m.id, "materia_nombre": m.nombre} for m in queryset.order_by("nombre")]
    return Response(data)

@api_view(["GET"])
def extraer_curso(request):
    nombre_curso = request.GET.get("curso", None)
    queryset = Curso.objects.all()
    if nombre_curso:
        queryset = queryset.filter(nombre__icontains=nombre_curso)
    data = [{"curso_id": c.id, "curso_nombre": c.nombre} for c in queryset.order_by("nombre")]
    return Response(data)

# ======================================================
# 🔹 Solo nombres de cursos/materias para selects
# ======================================================
@api_view(["GET"])
def curso(request):
    try:
        data = [c.nombre for c in Curso.objects.all().order_by("nombre")]
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def materia(request):
    try:
        data = [m.nombre for m in Materia.objects.all().order_by("nombre")]
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# ======================================================
# 🔹 Notas: Materia, Curso, Gestión
# ======================================================
@api_view(["GET"])
def notas_materia(request):
    try:
        materias = (
            SentralizadoNota.objects.select_related("materia")
            .values_list("materia__id", "materia__nombre")
            .distinct()
            .order_by("materia__nombre")
        )
        data = [{"materia_id": m[0], "materia_nombre": m[1]} for m in materias]
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def notas_curso(request):
    try:
        cursos = (
            SentralizadoNota.objects.select_related("curso")
            .values_list("curso__id", "curso__nombre")
            .distinct()
            .order_by("curso__nombre")
        )
        data = [{"curso_id": c[0], "curso_nombre": c[1]} for c in cursos]
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def notas_gestion(request):
    try:
        gestiones = SentralizadoNota.objects.values_list("gestion", flat=True).distinct().order_by("gestion")
        return Response(list(gestiones))
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# ======================================================
# 🔹 Filtro de notas (ORDENADO por apellido paterno)
# ======================================================
@api_view(["GET"])
def notas_filtro(request):
    get_curso = request.GET.get("curso", None)
    get_gestion = request.GET.get("gestion", None)
    get_materia = request.GET.get("materia", None)

    filtros = Q()
    if get_curso:
        filtros &= Q(curso__id=get_curso)
    if get_materia:
        filtros &= Q(materia__id=get_materia)
    if get_gestion:
        filtros &= Q(gestion=get_gestion)

    queryset = (
        SentralizadoNota.objects.select_related("curso", "materia", "persona")
        .filter(filtros)
        .order_by("persona__apellido_paterno", "persona__apellido_materno", "persona__nombre")
    )

    data = [
        {
            "persona_id": n.persona.id,
            "nombre": n.persona.nombre,
            "apellido_paterno": n.persona.apellido_paterno,
            "apellido_materno": n.persona.apellido_materno,
            "curso_id": n.curso.id,
            "curso_nombre": n.curso.nombre,
            "materia_id": n.materia.id,
            "materia_nombre": n.materia.nombre,
            "gestion": n.gestion,
            "t1_f1": n.t1_f1,
            "t1_f2": n.t1_f2,
            "t1_f3": n.t1_f3,
            "t1_promedio": n.t1_promedio,
            "t1_auto_evaluacion": n.t1_auto_evaluacion,
            "t2_f1": n.t2_f1,
            "t2_f2": n.t2_f2,
            "t2_f3": n.t2_f3,
            "t2_promedio": n.t2_promedio,
            "t2_auto_evaluacion": n.t2_auto_evaluacion,
            "t3_f1": n.t3_f1,
            "t3_f2": n.t3_f2,
            "t3_f3": n.t3_f3,
            "t3_promedio": n.t3_promedio,
            "t3_auto_evaluacion": n.t3_auto_evaluacion,
            "promedio_anual": n.promedio_anual,
        }
        for n in queryset
    ]
    return Response(data)

# ======================================================
# 🔹 Insertar / Actualizar notas
# ======================================================
@api_view(["POST"])
def notas_insertar(request):
    try:
        notas = request.data
        respuestas, errores = [], []

        with transaction.atomic():
            for n in notas:
                try:
                    def limpiar_valor(v, default=""):
                        if v is None:
                            return default
                        if isinstance(v, (int, float)):
                            return str(v)
                        return str(v).strip() if v else default

                    nombre = limpiar_valor(n.get("nombre"))
                    ap_pat = limpiar_valor(n.get("apellido_paterno"))
                    ap_mat = limpiar_valor(n.get("apellido_materno"))

                    if not ap_pat and not nombre:
                        errores.append({"error": "Nombre y apellido vacíos", "data": n})
                        continue

                    persona, persona_created = Persona.objects.get_or_create(
                        nombre=nombre,
                        apellido_paterno=ap_pat,
                        apellido_materno=ap_mat,
                        defaults={"ci": ""}
                    )

                    curso_nombre = limpiar_valor(n.get("curso_nombre"))
                    if not curso_nombre:
                        errores.append({"error": "Curso vacío", "data": n})
                        continue

                    curso, curso_created = Curso.objects.get_or_create(nombre=curso_nombre)

                    materia_nombre = limpiar_valor(n.get("materia_nombre"))
                    if not materia_nombre:
                        errores.append({"error": "Materia vacía", "data": n})
                        continue

                    materia, materia_created = Materia.objects.get_or_create(nombre=materia_nombre)

                    try:
                        gestion = int(n.get("gestion"))
                    except:
                        errores.append({"error": "Gestión inválida", "data": n})
                        continue

                    def procesar_nota(v):
                        if v in (None, ""):
                            return None
                        try:
                            return float(v)
                        except:
                            return None

                    nota, created = SentralizadoNota.objects.update_or_create(
                        curso=curso,
                        materia=materia,
                        persona=persona,
                        gestion=gestion,
                        defaults={
                            "t1_f1": procesar_nota(n.get("t1_f1")),
                            "t1_f2": procesar_nota(n.get("t1_f2")),
                            "t1_f3": procesar_nota(n.get("t1_f3")),
                            "t1_promedio": procesar_nota(n.get("t1_promedio")),
                            "t1_auto_evaluacion": procesar_nota(n.get("t1_auto_evaluacion")),
                            "t2_f1": procesar_nota(n.get("t2_f1")),
                            "t2_f2": procesar_nota(n.get("t2_f2")),
                            "t2_f3": procesar_nota(n.get("t2_f3")),
                            "t2_promedio": procesar_nota(n.get("t2_promedio")),
                            "t2_auto_evaluacion": procesar_nota(n.get("t2_auto_evaluacion")),
                            "t3_f1": procesar_nota(n.get("t3_f1")),
                            "t3_f2": procesar_nota(n.get("t3_f2")),
                            "t3_f3": procesar_nota(n.get("t3_f3")),
                            "t3_promedio": procesar_nota(n.get("t3_promedio")),
                            "t3_auto_evaluacion": procesar_nota(n.get("t3_auto_evaluacion")),
                            "promedio_anual": procesar_nota(n.get("promedio_anual")),
                        },
                    )

                    respuestas.append({
                        "persona": f"{persona.apellido_paterno} {persona.apellido_materno} {persona.nombre}",
                        "curso": curso.nombre,
                        "materia": materia.nombre,
                        "gestion": gestion,
                        "created": created,
                    })

                except Exception as e:
                    errores.append({"error": str(e), "data": n})

        return Response({
            "success": True,
            "procesados_exitosos": len(respuestas),
            "errores": len(errores),
            "detalles": respuestas,
            "errores_detallados": errores[:10],
        })
    except Exception as e:
        return Response({"success": False, "error": str(e)}, status=500)
