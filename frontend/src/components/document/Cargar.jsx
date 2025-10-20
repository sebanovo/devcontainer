/* eslint-disable prettier/prettier */

import { saveAs } from "file-saver";
import * as XLSX from "xlsx-js-style";
import { useEffect, useState } from "react";

function Cargar() {
  const [materias, setMaterias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const fetchMaterias = async () => {
    try {
      const res = await fetch("/api/cursos/Materia/");
      if (!res.ok) throw new Error();
      setMaterias(await res.json());
    } catch {
      setError("Error al cargar materias");
    }
  };

  const fetchCursos = async () => {
    try {
      const res = await fetch("/api/cursos/Curso/");
      if (!res.ok) throw new Error();
      setCursos(await res.json());
    } catch {
      setError("Error al cargar cursos");
    }
  };

  const fetchexcel = async () => {
    if (!cursoSeleccionado) return setError("Selecciona un curso primero");

    try {
      setCargando(true);
      const res = await fetch(
        `/api/notas/extraer/?curso=${encodeURIComponent(cursoSeleccionado)}`
      );
      if (!res.ok) throw new Error();
      const estudiantes = await res.json();
      if (!estudiantes.length) return setError("No se encontraron estudiantes");
      generarExcel(estudiantes);
    } catch {
      setError("Error al generar el archivo Excel");
    } finally {
      setCargando(false);
    }
  };

  const generarExcel = (estudiantes) => {
    const wb = XLSX.utils.book_new();
    const gestion = new Date().getFullYear();
    const startRow = 6;

    const datos = [
      ["UNIDAD EDUCATIVA JHON ANDREWS", ...Array(18).fill("")],
      [`REGISTRO DE CALIFICACIONES - GESTIÓN ${gestion}`, ...Array(18).fill("")],
      [],
      [
        "CURSO:", cursoSeleccionado, "", "",
        "MATERIA:", materiaSeleccionada, "", "",
        "DOCENTE:", "", "", "",
        "GESTION:"
      ],
      [],
      [
        "N°", "APELLIDOS Y NOMBRES",
        "PRIMER TRIMESTRE", "", "", "", "",
        "SEGUNDO TRIMESTRE", "", "", "", "",
        "TERCER TRIMESTRE", "", "", "", "",
        "PROMEDIO FINAL", "OBSERVACIONES"
      ],
      [
        "", "",
        "F1", "F2", "F3", "PROMEDIO", "AUTOEVAL.",
        "F1", "F2", "F3", "PROMEDIO", "AUTOEVAL.",
        "F1", "F2", "F3", "PROMEDIO", "AUTOEVAL.",
        "NOTA FINAL", ""
      ]
    ];

    estudiantes.forEach((e, i) => {
      const rowIndex = startRow + i;
      datos.push([
        i + 1,
        `${e.apellido_paterno} ${e.apellido_materno} ${e.nombre}`.toUpperCase(),
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", ""
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(datos);

    const colores = {
      azulOscuro: "1E88E5",
      azulMedio: "1976D2",
      azulClaro: "64B5F6",
      azulMuyClaro: "E3F2FD",
      verdeClaro: "81C784",
      grisClaro: "F5F5F5",
      grisBorder: "E0E0E0",
      blanco: "FFFFFF",
      textoOscuro: "000000",
      textoClaro: "FFFFFF"
    };

    const estilos = {
      titulo: {
        fill: { fgColor: { rgb: colores.azulOscuro } },
        font: { bold: true, color: { rgb: colores.textoClaro }, sz: 14 },
        alignment: { horizontal: "center" }
      },
      subtitulo: {
        fill: { fgColor: { rgb: colores.azulMedio } },
        font: { bold: true, color: { rgb: colores.textoClaro }, sz: 12 },
        alignment: { horizontal: "center" }
      },
      infoCurso: {
        fill: { fgColor: { rgb: colores.azulMuyClaro } },
        font: { bold: true, color: { rgb: colores.textoOscuro }, sz: 10 }
      },
      encabezado: {
        fill: { fgColor: { rgb: colores.azulClaro } },
        font: { bold: true, color: { rgb: colores.textoOscuro }, sz: 10 },
        alignment: { horizontal: "center" }
      },
      celdaNumero: {
        fill: { fgColor: { rgb: colores.grisClaro } },
        alignment: { horizontal: "center" },
        border: {
          top: { style: "thin", color: { rgb: colores.grisBorder } },
          left: { style: "thin", color: { rgb: colores.grisBorder } },
          right: { style: "thin", color: { rgb: colores.grisBorder } },
          bottom: { style: "thin", color: { rgb: colores.grisBorder } }
        }
      },
      celdaNombre: {
        alignment: { horizontal: "left" },
        border: {
          top: { style: "thin", color: { rgb: colores.grisBorder } },
          left: { style: "thin", color: { rgb: colores.grisBorder } },
          right: { style: "thin", color: { rgb: colores.grisBorder } },
          bottom: { style: "thin", color: { rgb: colores.grisBorder } }
        }
      },
      celdaNota: {
        alignment: { horizontal: "center" },
        border: {
          top: { style: "thin", color: { rgb: colores.grisBorder } },
          left: { style: "thin", color: { rgb: colores.grisBorder } },
          right: { style: "thin", color: { rgb: colores.grisBorder } },
          bottom: { style: "thin", color: { rgb: colores.grisBorder } }
        }
      }
    };

    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = 0; R <= range.e.r; R++) {
      for (let C = 0; C <= range.e.c; C++) {
        const cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cell_ref]) continue;

        if (R === 0) {
          ws[cell_ref].s = estilos.titulo;
        } else if (R === 1) {
          ws[cell_ref].s = estilos.subtitulo;
        } else if (R === 3) {
          ws[cell_ref].s = estilos.infoCurso;
        } else if (R === 5 || R === 6) {
          ws[cell_ref].s = estilos.encabezado;
        } else if (R >= startRow) {
          if (C === 0) {
            ws[cell_ref].s = estilos.celdaNumero;
          } else if (C === 1) {
            ws[cell_ref].s = estilos.celdaNombre;
          } else if (C >= 2 && C <= 16) {
            ws[cell_ref].s = estilos.celdaNota;
          } else if (C === 17) {
            ws[cell_ref].s = {
              ...estilos.celdaNota,
              fill: { fgColor: { rgb: colores.verdeClaro } },
              font: { bold: true }
            };
          } else {
            ws[cell_ref].s = estilos.celdaNota;
          }
        }
      }
    }

    const columnas = [
      { wch: 5 },
      { wch: 30 },
      { wch: 8 },
      { wch: 8 },
      { wch: 8 },
      { wch: 12 },
      { wch: 12 },
      { wch: 8 },
      { wch: 8 },
      { wch: 8 },
      { wch: 12 },
      { wch: 12 },
      { wch: 8 },
      { wch: 8 },
      { wch: 8 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 15 }
    ];
    ws["!cols"] = columnas;

    XLSX.utils.book_append_sheet(wb, ws, "Calificaciones");
    const buf = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true
    });

    saveAs(
      new Blob([buf], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }),
      `Calificaciones_${cursoSeleccionado.replace(/\s+/g, "_")}_${(materiaSeleccionada || "General").replace(/\s+/g, "_")}_${gestion}.xlsx`
    );
  };

  useEffect(() => {
    fetchMaterias();
    fetchCursos();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto", fontFamily: "Segoe UI" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: 30,
          fontWeight: "bold",
          background: "linear-gradient(135deg, #1E88E5, #0D47A1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        📘 Sistema de Gestión de Calificaciones
      </h2>

      <div
        style={{
          margin: "20px 0",
          padding: 25,
          borderRadius: 12,
          border: "2px solid #90CAF9",
          background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)"
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: 20, color: "#1565C0" }}>
          🎓 Configuración del Reporte
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={{ fontWeight: "bold", color: "#1976D2" }}>📚 Materia:</label>
            <select
              value={materiaSeleccionada}
              onChange={(e) => setMateriaSeleccionada(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "2px solid #64B5F6",
                fontSize: 14,
                cursor: "pointer"
              }}
            >
              <option value="">-- Selecciona una materia --</option>
              {materias.map((m, i) => (
                <option key={i} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontWeight: "bold", color: "#1976D2" }}>🏫 Curso:</label>
            <select
              value={cursoSeleccionado}
              onChange={(e) => setCursoSeleccionado(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "2px solid #64B5F6",
                fontSize: 14,
                cursor: "pointer"
              }}
            >
              <option value="">-- Selecciona un curso --</option>
              {cursos.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button
          onClick={fetchexcel}
          disabled={!cursoSeleccionado || cargando}
          style={{
            background: !cursoSeleccionado || cargando
              ? "linear-gradient(135deg, #B0BEC5, #78909C)"
              : "linear-gradient(135deg, #43A047, #2E7D32)",
            color: "white",
            padding: "15px 40px",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: "bold",
            cursor: !cursoSeleccionado || cargando ? "not-allowed" : "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            border: "none",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            if (cursoSeleccionado && !cargando) {
              e.target.style.transform = "scale(1.05)";
            }
          }}
          onMouseOut={(e) => {
            if (cursoSeleccionado && !cargando) {
              e.target.style.transform = "scale(1)";
            }
          }}
        >
          {cargando ? "⏳ Generando Excel..." : "📊 Descargar Excel"}
        </button>
      </div>

      {error && (
        <div
          style={{
            background: "#FFEBEE",
            color: "#B71C1C",
            padding: 15,
            marginTop: 20,
            borderRadius: 8,
            textAlign: "center",
            border: "1px solid #E57373"
          }}
        >
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

export default Cargar;