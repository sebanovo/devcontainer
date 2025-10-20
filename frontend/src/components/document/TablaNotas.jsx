/* eslint-disable prettier/prettier */

// components/common/TablaNotas.js
import styles from './css/TablaNotas.module.css';

export function TablaNotas({ datos, tipo = "completa" }) {
  // Configuración de columnas según el tipo
  const configuracionColumnas = {
    completa: [
      { key: 'apellido_paterno', label: 'Ap. Paterno', ancho: '120px' },
      { key: 'apellido_materno', label: 'Ap. Materno', ancho: '120px' },
      { key: 'nombre', label: 'Nombre', ancho: '150px' },
      { key: 't1_f1', label: 'T1 F1', ancho: '70px', tipo: 'nota' },
      { key: 't1_f2', label: 'T1 F2', ancho: '70px', tipo: 'nota' },
      { key: 't1_f3', label: 'T1 F3', ancho: '70px', tipo: 'nota' },
      { key: 't1_promedio', label: 'T1 Prom', ancho: '80px', tipo: 'promedio' },
      { key: 't1_auto_evaluacion', label: 'T1 Auto', ancho: '70px', tipo: 'nota' },
      { key: 't2_f1', label: 'T2 F1', ancho: '70px', tipo: 'nota' },
      { key: 't2_f2', label: 'T2 F2', ancho: '70px', tipo: 'nota' },
      { key: 't2_f3', label: 'T2 F3', ancho: '70px', tipo: 'nota' },
      { key: 't2_promedio', label: 'T2 Prom', ancho: '80px', tipo: 'promedio' },
      { key: 't2_auto_evaluacion', label: 'T2 Auto', ancho: '70px', tipo: 'nota' },
      { key: 't3_f1', label: 'T3 F1', ancho: '70px', tipo: 'nota' },
      { key: 't3_f2', label: 'T3 F2', ancho: '70px', tipo: 'nota' },
      { key: 't3_f3', label: 'T3 F3', ancho: '70px', tipo: 'nota' },
      { key: 't3_promedio', label: 'T3 Prom', ancho: '80px', tipo: 'promedio' },
      { key: 't3_auto_evaluacion', label: 'T3 Auto', ancho: '70px', tipo: 'nota' },
      { key: 'promedio_anual', label: 'Prom. Final', ancho: '90px', tipo: 'final' }
    ],
    resumen: [
      { key: 'nombre_completo', label: 'Estudiante', ancho: '250px' },
      { key: 't1_promedio', label: 'T1 Prom', ancho: '80px', tipo: 'promedio' },
      { key: 't2_promedio', label: 'T2 Prom', ancho: '80px', tipo: 'promedio' },
      { key: 't3_promedio', label: 'T3 Prom', ancho: '80px', tipo: 'promedio' },
      { key: 'promedio_anual', label: 'Prom. Final', ancho: '90px', tipo: 'final' }
    ],
    vistaPrevia: [
      { key: 'numero', label: '#', ancho: '50px' },
      { key: 'nombre_completo', label: 'Estudiante', ancho: '200px' },
      { key: 't1_f1', label: 'T1 F1', ancho: '70px', tipo: 'nota' },
      { key: 't1_f2', label: 'T1 F2', ancho: '70px', tipo: 'nota' },
      { key: 't1_f3', label: 'T1 F3', ancho: '70px', tipo: 'nota' },
      { key: 't1_promedio', label: 'T1 Prom', ancho: '80px', tipo: 'promedio' }
    ]
  };

  const columnas = configuracionColumnas[tipo] || configuracionColumnas.completa;

  // Preparar datos para la tabla
  const datosPreparados = datos.map((item, index) => {
    const datoPreparado = { ...item, numero: index + 1 };
    
    // Para la columna nombre_completo en vistas resumen
    if (tipo === 'resumen' || tipo === 'vistaPrevia') {
      datoPreparado.nombre_completo = `${item.apellido_paterno} ${item.apellido_materno} ${item.nombre}`;
    }
    
    return datoPreparado;
  });

  const formatearNota = (valor) => {
    if (valor === null || valor === undefined || valor === "") return "-";
    if (typeof valor === 'number') return valor.toFixed(1);
    return valor;
  };

  return (
    <div className={styles.contenedorTabla}>
      <div className={styles.tablaWrapper}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              {columnas.map(columna => (
                <th 
                  key={columna.key}
                  style={{ width: columna.ancho }}
                  className={styles[columna.tipo] || styles.default}
                >
                  {columna.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosPreparados.map((fila, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.filaPar : styles.filaImpar}>
                {columnas.map(columna => (
                  <td 
                    key={columna.key}
                    className={`${styles.celda} ${styles[columna.tipo] || styles.default}`}
                  >
                    {columna.key === 'nombre_completo' ? (
                      <div>
                        <div className={styles.nombrePrincipal}>
                          {fila.apellido_paterno} {fila.apellido_materno}
                        </div>
                        <div className={styles.nombreSecundario}>
                          {fila.nombre}
                        </div>
                      </div>
                    ) : (
                      formatearNota(fila[columna.key])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {datosPreparados.length === 0 && (
        <div className={styles.sinDatos}>
          No hay datos para mostrar
        </div>
      )}
    </div>
  );
}