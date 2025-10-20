/* eslint-disable prettier/prettier */
import * as XLSX from "xlsx";
import { useState } from "react";
import Swal from "sweetalert2";
import { TablaNotas } from './TablaNotas';
import styles from "./css/subir.module.css";

export function SubirExcel() {
  const [jsonDatos, setJsonDatos] = useState([]);
  const [procesando, setProcesando] = useState(false);
  const [metadata, setMetadata] = useState({});

  const leerExcel = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const nombreHoja = workbook.SheetNames[0];
        const hoja = workbook.Sheets[nombreHoja];
        const matrizDatos = XLSX.utils.sheet_to_json(hoja, { header: 1 });
        
        const metadataExtraida = extraerMetadata(matrizDatos);
        const notas = procesarFormato(matrizDatos, metadataExtraida);
        
        setJsonDatos(notas);
        setMetadata(metadataExtraida);

        Swal.fire({
          icon: "success",
          title: "✅ Archivo procesado",
          text: `Se procesaron ${notas.length} estudiantes correctamente.`,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El archivo no tiene el formato esperado.",
        });
      }
    };
    reader.readAsArrayBuffer(archivo);
  };

  const procesarFormato = (matrizDatos, metadata) => {
    const notas = [];
    const inicioDatos = 6;

    for (let i = inicioDatos; i < matrizDatos.length; i++) {
      const fila = matrizDatos[i];
      if (!fila || fila.length < 2 || !fila[1]) continue;
      
      const nombreCompleto = fila[1];
      if (!nombreCompleto || typeof nombreCompleto !== "string") continue;

      const { nombre, apellidoPaterno, apellidoMaterno } = parsearNombre(nombreCompleto);
      if (!apellidoPaterno && !nombre) continue;

      const nota = {
        nombre: nombre || "",
        apellido_paterno: apellidoPaterno || "",
        apellido_materno: apellidoMaterno || "",
        curso_nombre: metadata.curso || "",
        materia_nombre: metadata.materia || "",
        gestion: metadata.gestion || new Date().getFullYear().toString(),
        t1_f1: limpiarNota(fila[2]),
        t1_f2: limpiarNota(fila[3]),
        t1_f3: limpiarNota(fila[4]),
        t1_promedio: limpiarNota(fila[5]),
        t1_auto_evaluacion: limpiarNota(fila[6]),
        t2_f1: limpiarNota(fila[7]),
        t2_f2: limpiarNota(fila[8]),
        t2_f3: limpiarNota(fila[9]),
        t2_promedio: limpiarNota(fila[10]),
        t2_auto_evaluacion: limpiarNota(fila[11]),
        t3_f1: limpiarNota(fila[12]),
        t3_f2: limpiarNota(fila[13]),
        t3_f3: limpiarNota(fila[14]),
        t3_promedio: limpiarNota(fila[15]),
        t3_auto_evaluacion: limpiarNota(fila[16]),
        promedio_anual: limpiarNota(fila[17])
      };

      notas.push(nota);
    }

    return notas;
  };

  const extraerMetadata = (matrizDatos) => {
    const metadata = {
      curso: "",
      materia: "",
      gestion: "",
      colegio: "UNIDAD EDUCATIVA JHON ANDREWS",
    };

    try {
      if (matrizDatos[0] && matrizDatos[0][0]) metadata.colegio = matrizDatos[0][0];
      if (matrizDatos[1] && matrizDatos[1][0]) {
        const gestionMatch = matrizDatos[1][0].match(/GESTIÓN\s+(\d+)/);
        if (gestionMatch) metadata.gestion = gestionMatch[1];
      }
      if (matrizDatos[3]) {
        const f3 = matrizDatos[3];
        if (f3[1]) metadata.curso = f3[1];
        if (f3[5]) metadata.materia = f3[5];
        if (f3[13]) metadata.gestion = f3[13];
      }
      if (!metadata.gestion) metadata.gestion = new Date().getFullYear().toString();
    } catch {}
    return metadata;
  };

  const parsearNombre = (nombreCompleto) => {
    const partes = nombreCompleto.trim().toUpperCase().split(/\s+/).filter(p => p);
    if (partes.length >= 3) {
      const [paterno, materno, ...rest] = partes;
      return {
        nombre: capitalizar(rest.join(" ")),
        apellidoPaterno: capitalizar(paterno),
        apellidoMaterno: capitalizar(materno),
      };
    }
    return {
      nombre: partes[1] || "",
      apellidoPaterno: partes[0] || "",
      apellidoMaterno: "",
    };
  };

  const capitalizar = (t) =>
    !t ? "" : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();

  const limpiarNota = (v) => {
    if (v == null || v === "") return "";
    if (typeof v === 'number') return v;
    if (!isNaN(v)) return parseFloat(v);
    const num = parseFloat(v.toString().replace(",", "."));
    return isNaN(num) ? "" : num;
  };

  const enviarBackend = async () => {
    if (!jsonDatos.length)
      return Swal.fire({
        icon: "warning",
        title: "⚠️ No hay datos",
        text: "Debes cargar un archivo Excel primero.",
      });

    setProcesando(true);
    try {
      const res = await fetch("/api/notas/insertar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonDatos),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar datos.");

      Swal.fire({
        icon: "success",
        title: "🎉 Éxito",
        text: `${data.procesados_exitosos || jsonDatos.length} registros procesados correctamente.`,
      });

      // Limpiar después del éxito
      if (data.errores === 0) {
        setJsonDatos([]);
        setMetadata({});
        document.querySelector('input[type="file"]').value = '';
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "No se pudieron enviar los datos.",
      });
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>📤 Subir Excel de Notas</h2>

      <div className={styles.caja}>
        <h3 className={styles.subtitulo}>📝 Seleccionar Archivo Excel</h3>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={leerExcel}
          disabled={procesando}
          className={styles.inputFile}
        />
        <div className={styles.infoArchivo}>
          <p>Formato esperado: Archivo generado por el sistema</p>
        </div>
      </div>

      {jsonDatos.length > 0 && (
        <div className={styles.vistaPrevia}>
          <h3 className={styles.subtituloAzul}>📊 Vista Previa de Datos</h3>
          
          <div className={styles.infoMeta}>
            <div><strong>Curso:</strong> {metadata.curso || "No detectado"}</div>
            <div><strong>Materia:</strong> {metadata.materia || "No detectada"}</div>
            <div><strong>Gestión:</strong> {metadata.gestion || "No detectada"}</div>
            <div><strong>Estudiantes:</strong> {jsonDatos.length}</div>
          </div>

          <TablaNotas datos={jsonDatos} tipo="resumen" />
          <button
            className={styles.boton}
            onClick={enviarBackend}
            disabled={procesando}
          >
          
            {procesando ? "⏳ Procesando..." : `📤 Enviar ${jsonDatos.length} registros`}
          </button>
        </div>
      )}
    </div>
  );
}