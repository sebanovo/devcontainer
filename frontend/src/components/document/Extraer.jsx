/* eslint-disable prettier/prettier */
import { saveAs } from "file-saver";
import * as XLSX from "xlsx-js-style";
import { useEffect, useState } from "react";
import { TablaNotas } from './TablaNotas';
import styles from "./css/Extraer.module.css";

export function Extraer() {
  const [materias, setMaterias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [gestiones, setGestiones] = useState([]);

  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [gestionSeleccionada, setGestionSeleccionada] = useState("");

  const [notas, setNotas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Cargar combos iniciales
  const fetchMaterias = async () => {
    try {
      const res = await fetch("/api/notas/materia/");
      if (!res.ok) throw new Error();
      setMaterias(await res.json());
    } catch {
      setError("Error al cargar materias");
    }
  };

  const fetchCursos = async () => {
    try {
      const res = await fetch("/api/notas/curso/");
      if (!res.ok) throw new Error();
      setCursos(await res.json());
    } catch {
      setError("Error al cargar cursos");
    }
  };

  const fetchGestiones = async () => {
    try {
      const res = await fetch("/api/notas/gestion/");
      if (!res.ok) throw new Error();
      setGestiones(await res.json());
    } catch {
      setError("Error al cargar gestiones");
    }
  };

  useEffect(() => {
    fetchMaterias();
    fetchCursos();
    fetchGestiones();
  }, []);

  // Filtrar datos
  const enviar = async () => {
    if (!cursoSeleccionado || !materiaSeleccionada || !gestionSeleccionada) {
      setError("⚠️ Todos los campos son obligatorios");
      return;
    }

    try {
      setCargando(true);
      const url = `/api/notas/filtro/?curso=${cursoSeleccionado}&materia=${materiaSeleccionada}&gestion=${gestionSeleccionada}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (!data.length) {
        setError("No se encontraron notas para los criterios seleccionados");
        setNotas([]);
      } else {
        setNotas(data);
        setError("");
      }
    } catch {
      setError("Error al cargar notas del servidor");
    } finally {
      setCargando(false);
    }
  };

  // Generar Excel
  const generarExcel = () => {
    if (!notas.length) return setError("No hay notas para generar el Excel");

    const wb = XLSX.utils.book_new();
    const [primerNota] = notas;
    const mate = primerNota?.materia_nombre || "";
    const curs = primerNota?.curso_nombre || "";
    const Gest = primerNota?.gestion || "";

    const datos = [
      ["UNIDAD EDUCATIVA JHON ANDREWS", ...Array(18).fill("")],
      [`REGISTRO DE CALIFICACIONES - GESTIÓN ${gestionSeleccionada}`, ...Array(18).fill("")],
      [],
      ["CURSO:", curs, "", "", "MATERIA:", mate, "", "", "DOCENTE:", "", "", "", "FECHA:", Gest],
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

    notas.forEach((n, i) => {
      datos.push([
        i + 1,
        `${n.apellido_paterno} ${n.apellido_materno} ${n.nombre}`.toUpperCase(),
        n.t1_f1, n.t1_f2, n.t1_f3, n.t1_promedio, n.t1_auto_evaluacion,
        n.t2_f1, n.t2_f2, n.t2_f3, n.t2_promedio, n.t2_auto_evaluacion,
        n.t3_f1, n.t3_f2, n.t3_f3, n.t3_promedio, n.t3_auto_evaluacion,
        n.promedio_anual, ""
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(datos);

    const estilos = {
      titulo: { fill: { fgColor: { rgb: "1E88E5" } }, font: { bold: true, color: { rgb: "FFFFFF" }, sz: 14 }, alignment: { horizontal: "center" } },
      subtitulo: { fill: { fgColor: { rgb: "1976D2" } }, font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 }, alignment: { horizontal: "center" } },
      encabezado: { fill: { fgColor: { rgb: "64B5F6" } }, font: { bold: true }, alignment: { horizontal: "center" } },
      celda: { border: { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } }, alignment: { horizontal: "center" } }
    };

    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = 0; R <= range.e.r; R++) {
      for (let C = 0; C <= range.e.c; C++) {
        const ref = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[ref]) continue;
        if (R === 0) ws[ref].s = estilos.titulo;
        else if (R === 1) ws[ref].s = estilos.subtitulo;
        else if (R === 5 || R === 6) ws[ref].s = estilos.encabezado;
        else if (R >= 7) ws[ref].s = estilos.celda;
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, "Calificaciones");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array", cellStyles: true });
    saveAs(
      new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
      `Calificaciones_${curs}_${mate}_${gestionSeleccionada}.xlsx`
    );
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>📘 Extraer Calificaciones</h2>

      <div className={styles.caja}>
        <h3 className={styles.subtitulo}>🎓 Configuración del Reporte</h3>
        <div className={styles.gridSelects}>
          <select 
            value={cursoSeleccionado} 
            onChange={e => setCursoSeleccionado(e.target.value)}
            className={styles.select}
          >
            <option value="">Seleccione un curso</option>
            {cursos.map(c => (
              <option key={c.curso_id} value={c.curso_id}>{c.curso_nombre}</option>
            ))}
          </select>

          <select 
            value={materiaSeleccionada} 
            onChange={e => setMateriaSeleccionada(e.target.value)}
            className={styles.select}
          >
            <option value="">Seleccione una materia</option>
            {materias.map(m => (
              <option key={m.materia_id} value={m.materia_id}>{m.materia_nombre}</option>
            ))}
          </select>

          <select 
            value={gestionSeleccionada} 
            onChange={e => setGestionSeleccionada(e.target.value)}
            className={styles.select}
          >
            <option value="">Seleccione una gestión</option>
            {gestiones.map((g, i) => (
              <option key={i} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className={styles.botones}>
          <button onClick={enviar} disabled={cargando} className={styles.btnVerde}>
            {cargando ? "⏳ Cargando..." : "🔍 Extraer Datos"}
          </button>
          {notas.length > 0 && (
            <button onClick={generarExcel} className={styles.btnAzul}>
              📊 Descargar Excel
            </button>
          )}
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {notas.length > 0 && (
        <div className={styles.seccionTabla}>
          <h3 className={styles.subtituloTabla}>
            📋 Resultados ({notas.length} estudiantes)
          </h3>
          <TablaNotas datos={notas} tipo="completa" />
        </div>
      )}
    </div>
  );
}