-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistema_gestion_colegios3;
USE sistema_gestion_colegios3;
-- Tabla de tenants (colegios)
CREATE TABLE colegios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    subdominio VARCHAR(100) NOT NULL UNIQUE,
    direccion TEXT,
    telefono VARCHAR(20),
    ciudad VARCHAR(100) DEFAULT 'La Paz',
    pais VARCHAR(100) DEFAULT 'Bolivia',
    imagen_url VARCHAR(255) NULL,
    estado ENUM('activo', 'inactivo', 'pendiente') DEFAULT 'pendiente',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de usuarios (para todos los roles)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    ci VARCHAR(20) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    genero ENUM('M', 'F', 'O'),
    telefono VARCHAR(20),
    email VARCHAR(255),
    direccion TEXT,
    foto_url VARCHAR(255) NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'profesor', 'estudiante', 'padre') NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_ci_colegio (colegio_id, ci)
);

-- Tabla de dueños de colegios
CREATE TABLE duenos_colegios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_dueno_colegio (colegio_id, usuario_id)
);

-- Tabla de grados/cursos
CREATE TABLE grados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    nivel ENUM('inicial', 'primaria', 'secundaria') NOT NULL,
    descripcion TEXT,
    capacidad_maxima INT DEFAULT 30,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_grado_colegio (colegio_id, nombre)
);

-- Tabla de materias
CREATE TABLE materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_materia_colegio (colegio_id, nombre)
);

-- Tabla de aulas
CREATE TABLE aulas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    capacidad INT DEFAULT 30,
    piso INT,
    edificio VARCHAR(100),
    estado ENUM('disponible', 'mantenimiento', 'ocupado') DEFAULT 'disponible',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_aula_colegio (colegio_id, nombre)
);

-- Tabla de horarios
CREATE TABLE horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    grado_id INT NOT NULL,
    materia_id INT NOT NULL,
    profesor_id INT NOT NULL,
    aula_id INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    FOREIGN KEY (grado_id) REFERENCES grados(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE,
    FOREIGN KEY (profesor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE
);

-- Tabla de matriculas (relación estudiantes-grados)
CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    estudiante_id INT NOT NULL,
    grado_id INT NOT NULL,
    anio_escolar YEAR NOT NULL,
    fecha_matricula DATE NOT NULL,
    estado ENUM('activo', 'inactivo', 'graduado', 'retirado') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (grado_id) REFERENCES grados(id) ON DELETE CASCADE,
    UNIQUE KEY unique_matricula_anio (colegio_id, estudiante_id, anio_escolar)
);

-- Tabla de relación padres-estudiantes
CREATE TABLE padres_estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    padre_id INT NOT NULL,
    estudiante_id INT NOT NULL,
    parentesco ENUM('padre', 'madre', 'tutor', 'otro') NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    FOREIGN KEY (padre_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_padre_estudiante (colegio_id, padre_id, estudiante_id)
);

-- Tabla de evaluaciones
CREATE TABLE evaluaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    materia_id INT NOT NULL,
    grado_id INT NOT NULL,
    profesor_id INT NOT NULL,
    tipo_evaluacion ENUM('examen', 'quiz', 'tarea', 'proyecto', 'participacion') NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_evaluacion DATE NOT NULL,
    puntaje_maximo DECIMAL(5,2) NOT NULL,
    peso DECIMAL(5,2) DEFAULT 1.0,
    estado ENUM('programado', 'realizado', 'cancelado') DEFAULT 'programado',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE,
    FOREIGN KEY (grado_id) REFERENCES grados(id) ON DELETE CASCADE,
    FOREIGN KEY (profesor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de calificaciones
CREATE TABLE calificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    evaluacion_id INT NOT NULL,
    estudiante_id INT NOT NULL,
    calificacion DECIMAL(5,2) NOT NULL,
    observaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    FOREIGN KEY (evaluacion_id) REFERENCES evaluaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_calificacion_estudiante (colegio_id, evaluacion_id, estudiante_id)
);

-- Tabla de asistencias
CREATE TABLE asistencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    estudiante_id INT NOT NULL,
    horario_id INT NOT NULL,
    fecha DATE NOT NULL,
    estado ENUM('presente', 'tardanza', 'ausente', 'justificado') NOT NULL,
    observaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (horario_id) REFERENCES horarios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_asistencia_estudiante (colegio_id, estudiante_id, horario_id, fecha)
);

-- Tabla de conceptos de pago
CREATE TABLE conceptos_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    monto DECIMAL(10,2) NOT NULL,
    periodicidad ENUM('unico', 'mensual', 'trimestral', 'anual') DEFAULT 'mensual',
    aplica_desde DATE,
    aplica_hasta DATE,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_concepto_colegio (colegio_id, nombre)
);

-- Tabla de mensualidades (gestión específica de cuotas mensuales)
CREATE TABLE mensualidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    concepto_id INT NOT NULL,
    mes TINYINT NOT NULL CHECK (mes >= 1 AND mes <= 12),
    anio YEAR NOT NULL,
    nombre_mes VARCHAR(20) NOT NULL,
    fecha_limite_pago DATE NOT NULL,
    estado ENUM('pendiente', 'activa', 'vencida', 'cerrada') DEFAULT 'pendiente',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    FOREIGN KEY (concepto_id) REFERENCES conceptos_pago(id) ON DELETE CASCADE,
    UNIQUE KEY unique_mensualidad_colegio (colegio_id, concepto_id, mes, anio)
);

-- Tabla de pagos
CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    estudiante_id INT NOT NULL,
    concepto_id INT NOT NULL,
    mensualidad_id INT NULL,
    pagador_id INT NULL, -- Persona que realizó el pago (padre, estudiante, etc.)
    matricula_id INT NULL, -- Referencia a la matrícula si es pago de matrícula
    monto DECIMAL(10,2) NOT NULL,
    fecha_emision DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    fecha_pago DATE,
    estado ENUM('pendiente', 'pagado', 'parcial', 'vencido', 'cancelado') DEFAULT 'pendiente',
    metodo_pago ENUM('efectivo', 'transferencia', 'tarjeta', 'deposito') DEFAULT 'efectivo',
    referencia_pago VARCHAR(255),
    observaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (concepto_id) REFERENCES conceptos_pago(id) ON DELETE CASCADE,
    FOREIGN KEY (mensualidad_id) REFERENCES mensualidades(id) ON DELETE CASCADE,
    FOREIGN KEY (pagador_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (matricula_id) REFERENCES matriculas(id) ON DELETE SET NULL
);

-- Tabla de eventos del colegio
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    tipo_evento ENUM('academico', 'cultural', 'deportivo', 'reunion', 'otro') NOT NULL,
    participantes ENUM('todos', 'profesores', 'estudiantes', 'padres') DEFAULT 'todos',
    estado ENUM('programado', 'realizado', 'cancelado') DEFAULT 'programado',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE
);

-- Tabla de comunicados
CREATE TABLE comunicados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    destinatarios ENUM('todos', 'profesores', 'estudiantes', 'padres') DEFAULT 'todos',
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion DATE,
    estado ENUM('publicado', 'borrador', 'archivado') DEFAULT 'borrador',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE CASCADE
);

-- Tabla de bitácora (log de actividades del sistema)
CREATE TABLE bitacora (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colegio_id INT NULL,
    usuario_id INT NULL,
    accion VARCHAR(100) NOT NULL,
    modulo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (colegio_id) REFERENCES colegios(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Poblar la base de datos con datos de ejemplo
USE sistema_gestion_colegios3;

-- Insertar colegios (tenants)
INSERT INTO colegios (nombre, subdominio, direccion, telefono, ciudad, imagen_url, estado) VALUES
('Colegio Boliviano "Mariscal Sucre"', 'mariscalsucre', 'Av. Arce 1234', '22223333', 'La Paz', 'https://ejemplo.com/colegio1.jpg', 'activo'),
('Unidad Educativa San Calixto', 'sancalixto', 'Calle Potosí 567', '24445555', 'La Paz', 'https://ejemplo.com/colegio2.jpg', 'activo'),
('Colegio Franco Boliviano', 'francoboliviano', 'Av. 6 de Agosto 789', '27778888', 'La Paz', 'https://ejemplo.com/colegio3.jpg', 'activo'),
('Colegio Alemán Mariscal Braun', 'alemanbraun', 'Calle Loayza 321', '21112222', 'La Paz', 'https://ejemplo.com/colegio4.jpg', 'activo');

-- Insertar usuarios para Colegio 1 (Mariscal Sucre)
INSERT INTO usuarios (colegio_id, ci, nombre, fecha_nacimiento, genero, telefono, email, direccion, foto_url, password_hash, rol) VALUES
(1, '1234567LP', 'Juan Pérez', '1980-05-15', 'M', '77788899', 'juan.perez@mariscalsucre.edu.bo', 'Av. Camacho 456', 'https://ejemplo.com/foto1.jpg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
(1, '7654321LP', 'María López', '1985-08-20', 'F', '77711122', 'maria.lopez@mariscalsucre.edu.bo', 'Calle Colón 789', 'https://ejemplo.com/foto2.jpg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'profesor'),
(1, '9876543LP', 'Carlos García', '2010-03-10', 'M', NULL, 'carlos.garcia@mariscalsucre.edu.bo', 'Av. 16 de Julio 101', 'https://ejemplo.com/foto3.jpg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'estudiante'),
(1, '5555555LP', 'Ana Martínez', '1975-11-25', 'F', '77733344', 'ana.martinez@mariscalsucre.edu.bo', 'Calle Mercado 202', 'https://ejemplo.com/foto4.jpg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'padre'),
(1, '1111111LP', 'Roberto Fernández', '1982-04-12', 'M', '77755566', 'roberto.fernandez@mariscalsucre.edu.bo', 'Av. Busch 303', 'https://ejemplo.com/foto5.jpg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'profesor'),
(1, '2222222LP', 'Laura Vargas', '2011-07-18', 'F', NULL, 'laura.vargas@mariscalsucre.edu.bo', 'Calle Bueno 404', 'https://ejemplo.com/foto6.jpg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'estudiante'),
(1, '3333333LP', 'Pedro Soto', '1978-09-30', 'M', '77766677', 'pedro.soto@mariscalsucre.edu.bo', 'Av. Villazón 505', 'https://ejemplo.com/foto7.jpg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'padre');

-- Insertar usuarios para Colegio 2 (San Calixto)
INSERT INTO usuarios (colegio_id, ci, nombre, fecha_nacimiento, genero, telefono, email, direccion, foto_url, password_hash, rol) VALUES
(2, '4444444LP', 'Carmen Rojas', '1979-02-14', 'F', '77799900', 'carmen.rojas@sancalixto.edu.bo', 'Calle Ingavi 606', 'https://ejemplo.com/foto8.jpg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
(2, '8888888LP', 'Jorge Mendoza', '1983-12-05', 'M', '77722233', 'jorge.mendoza@sancalixto.edu.bo', 'Av. Perú 707', 'https://ejemplo.com/foto9.jpg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'profesor'),
(2, '9999999LP', 'Sofía Castillo', '2012-01-22', 'F', NULL, 'sofia.castillo@sancalixto.edu.bo', 'Calle Yanacocha 808', 'https://ejemplo.com/foto10.jpg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'estudiante');

-- Asignar dueños a colegios
INSERT INTO duenos_colegios (colegio_id, usuario_id) VALUES 
(1, 1), -- Juan Pérez dueño de Mariscal Sucre
(2, 8); -- Carmen Rojas dueña de San Calixto

-- Insertar grados para Colegio 1
INSERT INTO grados (colegio_id, nombre, nivel, capacidad_maxima) VALUES
(1, 'Primero de Primaria', 'primaria', 30),
(1, 'Segundo de Primaria', 'primaria', 30),
(1, 'Tercero de Primaria', 'primaria', 30),
(1, 'Primero de Secundaria', 'secundaria', 35),
(1, 'Segundo de Secundaria', 'secundaria', 35);

-- Insertar grados para Colegio 2
INSERT INTO grados (colegio_id, nombre, nivel, capacidad_maxima) VALUES
(2, 'Primero de Primaria', 'primaria', 25),
(2, 'Cuarto de Primaria', 'primaria', 25),
(2, 'Quinto de Secundaria', 'secundaria', 30);

-- Insertar materias para Colegio 1
INSERT INTO materias (colegio_id, nombre, descripcion) VALUES
(1, 'Matemáticas', 'Curso de matemáticas para todos los niveles'),
(1, 'Lenguaje', 'Curso de lenguaje y comunicación'),
(1, 'Ciencias Naturales', 'Estudio de las ciencias naturales'),
(1, 'Ciencias Sociales', 'Historia y geografía'),
(1, 'Educación Física', 'Actividades físicas y deportivas'),
(1, 'Arte y Cultura', 'Expresión artística y cultural'),
(1, 'Música', 'Educación musical');

-- Insertar materias para Colegio 2
INSERT INTO materias (colegio_id, nombre, descripcion) VALUES
(2, 'Matemáticas', 'Matemáticas avanzadas'),
(2, 'Lenguaje', 'Comunicación y literatura'),
(2, 'Física', 'Ciencias físicas'),
(2, 'Química', 'Ciencias químicas');

-- Insertar aulas
INSERT INTO aulas (colegio_id, nombre, capacidad, piso, edificio) VALUES
(1, 'Aula 101', 30, 1, 'Edificio Principal'),
(1, 'Aula 102', 30, 1, 'Edificio Principal'),
(1, 'Aula 201', 35, 2, 'Edificio Principal'),
(1, 'Laboratorio de Ciencias', 20, 2, 'Edificio de Ciencias'),
(1, 'Sala de Música', 25, 1, 'Edificio de Arte'),
(2, 'Aula 1A', 25, 1, 'Bloque A'),
(2, 'Aula 2B', 30, 2, 'Bloque B'),
(2, 'Laboratorio', 20, 1, 'Bloque C');

-- Insertar horarios para Colegio 1
INSERT INTO horarios (colegio_id, grado_id, materia_id, profesor_id, aula_id, dia_semana, hora_inicio, hora_fin) VALUES
(1, 1, 1, 2, 1, 'Lunes', '08:00:00', '09:00:00'),
(1, 1, 2, 2, 1, 'Lunes', '09:00:00', '10:00:00'),
(1, 1, 3, 5, 4, 'Martes', '08:00:00', '09:30:00'),
(1, 4, 1, 5, 3, 'Lunes', '10:00:00', '11:30:00'),
(1, 4, 4, 2, 3, 'Martes', '10:00:00', '11:00:00'),
(1, 4, 5, 5, 2, 'Miercoles', '08:00:00', '09:30:00');

-- Insertar matrículas
INSERT INTO matriculas (colegio_id, estudiante_id, grado_id, anio_escolar, fecha_matricula) VALUES
(1, 3, 1, 2023, '2023-01-15'),
(1, 6, 1, 2023, '2023-01-16'),
(1, 3, 2, 2024, '2024-01-10'),
(1, 6, 2, 2024, '2024-01-12');

-- Insertar relación padres-estudiantes
INSERT INTO padres_estudiantes (colegio_id, padre_id, estudiante_id, parentesco) VALUES
(1, 4, 3, 'madre'),
(1, 7, 6, 'padre'),
(1, 4, 6, 'tutor');

-- Insertar conceptos de pago
INSERT INTO conceptos_pago (colegio_id, nombre, descripcion, monto, periodicidad) VALUES
(1, 'Matrícula', 'Pago de matrícula anual', 500.00, 'anual'),
(1, 'Mensualidad', 'Pago de mensualidad', 300.00, 'mensual'),
(1, 'Materiales', 'Materiales educativos', 150.00, 'trimestral'),
(1, 'Actividades', 'Actividades extracurriculares', 100.00, 'unico'),
(2, 'Matrícula', 'Pago de matrícula anual', 600.00, 'anual'),
(2, 'Mensualidad', 'Pago de mensualidad', 350.00, 'mensual');

-- Insertar mensualidades para 2023
INSERT INTO mensualidades (colegio_id, concepto_id, mes, anio, nombre_mes, fecha_limite_pago, estado) VALUES
(1, 2, 1, 2023, 'Enero', '2023-01-10', 'cerrada'),
(1, 2, 2, 2023, 'Febrero', '2023-02-10', 'cerrada'),
(1, 2, 3, 2023, 'Marzo', '2023-03-10', 'cerrada'),
(1, 2, 4, 2023, 'Abril', '2023-04-10', 'cerrada'),
(1, 2, 5, 2023, 'Mayo', '2023-05-10', 'cerrada'),
(1, 2, 6, 2023, 'Junio', '2023-06-10', 'cerrada'),
(1, 2, 7, 2023, 'Julio', '2023-07-10', 'cerrada'),
(1, 2, 8, 2023, 'Agosto', '2023-08-10', 'cerrada'),
(1, 2, 9, 2023, 'Septiembre', '2023-09-10', 'cerrada'),
(1, 2, 10, 2023, 'Octubre', '2023-10-10', 'cerrada'),
(1, 2, 1, 2024, 'Enero', '2024-01-10', 'activa'),
(1, 2, 2, 2024, 'Febrero', '2024-02-10', 'pendiente');

-- Insertar pagos
INSERT INTO pagos (colegio_id, estudiante_id, concepto_id, mensualidad_id, pagador_id, matricula_id, monto, fecha_emision, fecha_vencimiento, fecha_pago, estado, metodo_pago) VALUES
(1, 3, 1, NULL, 4, 1, 500.00, '2023-01-15', '2023-01-30', '2023-01-15', 'pagado', 'efectivo'),
(1, 3, 2, 1, 4, NULL, 300.00, '2023-01-05', '2023-01-10', '2023-01-08', 'pagado', 'transferencia'),
(1, 3, 2, 2, 4, NULL, 300.00, '2023-02-05', '2023-02-10', '2023-02-09', 'pagado', 'transferencia'),
(1, 3, 2, 3, 4, NULL, 300.00, '2023-03-05', '2023-03-10', '2023-03-12', 'pagado', 'transferencia'),
(1, 3, 2, 4, 4, NULL, 300.00, '2023-04-05', '2023-04-10', NULL, 'vencido', 'efectivo'),
(1, 6, 1, NULL, 7, 2, 500.00, '2023-01-16', '2023-01-31', '2023-01-20', 'pagado', 'deposito'),
(1, 6, 2, 1, 7, NULL, 300.00, '2023-01-05', '2023-01-10', '2023-01-07', 'pagado', 'tarjeta'),
(1, 6, 2, 2, 7, NULL, 300.00, '2023-02-05', '2023-02-10', NULL, 'pendiente', 'efectivo');

-- Insertar evaluaciones
INSERT INTO evaluaciones (colegio_id, materia_id, grado_id, profesor_id, tipo_evaluacion, nombre, descripcion, fecha_evaluacion, puntaje_maximo, peso, estado) VALUES
(1, 1, 1, 2, 'examen', 'Examen Parcial Matemáticas', 'Primer examen parcial de matemáticas', '2023-03-15', 100.00, 0.3, 'realizado'),
(1, 1, 1, 2, 'examen', 'Examen Final Matemáticas', 'Examen final de matemáticas', '2023-06-20', 100.00, 0.4, 'realizado'),
(1, 2, 1, 2, 'quiz', 'Quiz de Lenguaje', 'Quiz de comprensión lectora', '2023-04-10', 50.00, 0.2, 'realizado'),
(1, 3, 1, 5, 'proyecto', 'Proyecto Ciencias', 'Proyecto sobre ecosistemas', '2023-05-15', 80.00, 0.3, 'realizado');

-- Insertar calificaciones
INSERT INTO calificaciones (colegio_id, evaluacion_id, estudiante_id, calificacion) VALUES
(1, 1, 3, 85.00),
(1, 1, 6, 92.00),
(1, 2, 3, 78.00),
(1, 2, 6, 88.00),
(1, 3, 3, 45.00),
(1, 3, 6, 48.00),
(1, 4, 3, 75.00),
(1, 4, 6, 80.00);

-- Insertar asistencias
INSERT INTO asistencias (colegio_id, estudiante_id, horario_id, fecha, estado) VALUES
(1, 3, 1, '2023-03-01', 'presente'),
(1, 6, 1, '2023-03-01', 'presente'),
(1, 3, 1, '2023-03-08', 'tardanza'),
(1, 6, 1, '2023-03-08', 'presente'),
(1, 3, 1, '2023-03-15', 'ausente'),
(1, 6, 1, '2023-03-15', 'presente');

-- Insertar eventos
INSERT INTO eventos (colegio_id, titulo, descripcion, fecha_inicio, fecha_fin, tipo_evento, participantes, estado) VALUES
(1, 'Día del Estudiante', 'Celebración del día del estudiante con actividades recreativas', '2023-07-21 09:00:00', '2023-07-21 15:00:00', 'cultural', 'estudiantes', 'realizado'),
(1, 'Reunión de Padres', 'Reunión informativa para padres de familia', '2023-08-05 18:00:00', '2023-08-05 20:00:00', 'reunion', 'padres', 'programado'),
(1, 'Olimpiadas Deportivas', 'Competencias deportivas internas', '2023-09-15 08:00:00', '2023-09-16 17:00:00', 'deportivo', 'todos', 'programado');

-- Insertar comunicados
INSERT INTO comunicados (colegio_id, titulo, contenido, destinatarios, fecha_expiracion, estado) VALUES
(1, 'Inicio de Clases', 'Se informa que las clases iniciarán el 1 de febrero de 2023 según el horario establecido.', 'todos', '2023-02-15', 'publicado'),
(1, 'Pago de Mensualidades', 'Recordatorio que el pago de la mensualidad de enero vence el 10 de enero.', 'padres', '2023-01-11', 'archivado'),
(1, 'Entrega de Libretas', 'La entrega de libretas del primer trimestre será el día 15 de abril.', 'padres', '2023-04-20', 'publicado');

-- Insertar registros en bitácora
INSERT INTO bitacora (colegio_id, usuario_id, accion, modulo, descripcion, ip_address) VALUES
(1, 1, 'LOGIN', 'SISTEMA', 'Inicio de sesión exitoso', '192.168.1.100'),
(1, 1, 'CREACION', 'USUARIO', 'Creación de nuevo usuario profesor', '192.168.1.100'),
(1, 4, 'PAGO', 'FINANZAS', 'Pago de matrícula realizado', '192.168.1.101'),
(1, 2, 'CALIFICACION', 'ACADEMICO', 'Registro de calificaciones del examen parcial', '192.168.1.102'),
(2, 8, 'LOGIN', 'SISTEMA', 'Inicio de sesión exitoso', '192.168.1.105');

-- CONSULTAS INTERESANTES

-- 1. Listar todos los estudiantes de un colegio específico con sus grados
SELECT 
    u.nombre AS estudiante, 
    g.nombre AS grado, 
    g.nivel, 
    m.anio_escolar
FROM usuarios u
JOIN matriculas m ON u.id = m.estudiante_id
JOIN grados g ON m.grado_id = g.id
WHERE u.colegio_id = 1 AND u.rol = 'estudiante'
ORDER BY g.nivel, g.nombre;

-- 2. Calcular el total de pagos realizados por cada estudiante en un colegio
SELECT 
    u.nombre AS estudiante,
    COUNT(p.id) AS total_pagos,
    SUM(p.monto) AS monto_total,
    MAX(p.fecha_pago) AS ultimo_pago
FROM usuarios u
JOIN pagos p ON u.id = p.estudiante_id
WHERE u.colegio_id = 1 AND u.rol = 'estudiante' AND p.estado = 'pagado'
GROUP BY u.id
ORDER BY monto_total DESC;

-- 3. Obtener el promedio de calificaciones por materia para un grado específico
SELECT 
    m.nombre AS materia,
    AVG(c.calificacion) AS promedio_calificaciones,
    COUNT(c.id) AS total_evaluaciones
FROM calificaciones c
JOIN evaluaciones e ON c.evaluacion_id = e.id
JOIN materias m ON e.materia_id = m.id
WHERE e.colegio_id = 1 AND e.grado_id = 1
GROUP BY m.id
ORDER BY promedio_calificaciones DESC;

-- 4. Consulta de asistencias por estudiante con porcentaje de asistencia
SELECT 
    u.nombre AS estudiante,
    COUNT(a.id) AS total_clases,
    SUM(CASE WHEN a.estado = 'presente' THEN 1 ELSE 0 END) AS asistencias,
    SUM(CASE WHEN a.estado = 'tardanza' THEN 1 ELSE 0 END) AS tardanzas,
    SUM(CASE WHEN a.estado = 'ausente' THEN 1 ELSE 0 END) AS ausencias,
    ROUND((SUM(CASE WHEN a.estado IN ('presente', 'tardanza') THEN 1 ELSE 0 END) * 100.0 / COUNT(a.id)), 2) AS porcentaje_asistencia
FROM usuarios u
JOIN asistencias a ON u.id = a.estudiante_id
WHERE u.colegio_id = 1 AND u.rol = 'estudiante'
GROUP BY u.id
ORDER BY porcentaje_asistencia DESC;

-- 5. Listar los pagos pendientes y vencidos por estudiante
SELECT 
    u.nombre AS estudiante,
    cp.nombre AS concepto,
    p.fecha_emision,
    p.fecha_vencimiento,
    p.monto,
    p.estado,
    DATEDIFF(CURDATE(), p.fecha_vencimiento) AS dias_vencido
FROM pagos p
JOIN usuarios u ON p.estudiante_id = u.id
JOIN conceptos_pago cp ON p.concepto_id = cp.id
WHERE u.colegio_id = 1 AND p.estado IN ('pendiente', 'vencido')
ORDER BY p.fecha_vencimiento;

-- 6. Profesores con la cantidad de materias que imparten y grados
SELECT 
    u.nombre AS profesor,
    COUNT(DISTINCT h.materia_id) AS cantidad_materias,
    COUNT(DISTINCT h.grado_id) AS cantidad_grados,
    GROUP_CONCAT(DISTINCT m.nombre SEPARATOR ', ') AS materias
FROM usuarios u
JOIN horarios h ON u.id = h.profesor_id
JOIN materias m ON h.materia_id = m.id
WHERE u.colegio_id = 1 AND u.rol = 'profesor'
GROUP BY u.id
ORDER BY cantidad_materias DESC;

-- 7. Consulta de deudores (estudiantes con pagos vencidos)
SELECT 
    u.nombre AS estudiante,
    g.nombre AS grado,
    cp.nombre AS concepto,
    p.monto,
    p.fecha_vencimiento,
    DATEDIFF(CURDATE(), p.fecha_vencimiento) AS dias_vencido,
    pagador.nombre AS quien_debe_pagar
FROM pagos p
JOIN usuarios u ON p.estudiante_id = u.id
JOIN conceptos_pago cp ON p.concepto_id = cp.id
JOIN matriculas mat ON u.id = mat.estudiante_id
JOIN grados g ON mat.grado_id = g.id
LEFT JOIN usuarios pagador ON p.pagador_id = pagador.id
WHERE u.colegio_id = 1 AND p.estado = 'vencido'
ORDER BY dias_vencido DESC;

-- 8. Evolución de pagos mensuales para un colegio
SELECT 
    m.nombre_mes,
    m.anio,
    COUNT(p.id) AS total_pagos,
    IFNULL(SUM(p.monto), 0) AS monto_recaudado,
    IFNULL(AVG(p.monto), 0) AS promedio_pago
FROM mensualidades m
LEFT JOIN pagos p ON m.id = p.mensualidad_id AND p.estado = 'pagado'
WHERE m.colegio_id = 1
GROUP BY m.id, m.nombre_mes, m.anio
ORDER BY m.anio, m.mes;

-- 9. Padres con múltiples estudiantes en el colegio
SELECT 
    p.nombre AS padre,
    COUNT(pe.estudiante_id) AS cantidad_hijos,
    GROUP_CONCAT(e.nombre SEPARATOR ', ') AS hijos
FROM padres_estudiantes pe
JOIN usuarios p ON pe.padre_id = p.id
JOIN usuarios e ON pe.estudiante_id = e.id
WHERE pe.colegio_id = 1
GROUP BY p.id
HAVING cantidad_hijos > 1
ORDER BY cantidad_hijos DESC;

-- 10. Horario completo de un grado específico
SELECT 
    g.nombre AS grado,
    m.nombre AS materia,
    u.nombre AS profesor,
    a.nombre AS aula,
    h.dia_semana,
    h.hora_inicio,
    h.hora_fin
FROM horarios h
JOIN grados g ON h.grado_id = g.id
JOIN materias m ON h.materia_id = m.id
JOIN usuarios u ON h.profesor_id = u.id
JOIN aulas a ON h.aula_id = a.id
WHERE h.colegio_id = 1 AND h.grado_id = 1
ORDER BY 
    FIELD(h.dia_semana, 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'),
    h.hora_inicio;

-- 11. Estadísticas de colegio: resumen general
SELECT 
    c.nombre AS colegio,
    COUNT(DISTINCT u.id) AS total_usuarios,
    SUM(CASE WHEN u.rol = 'estudiante' THEN 1 ELSE 0 END) AS total_estudiantes,
    SUM(CASE WHEN u.rol = 'profesor' THEN 1 ELSE 0 END) AS total_profesores,
    SUM(CASE WHEN u.rol = 'padre' THEN 1 ELSE 0 END) AS total_padres,
    COUNT(DISTINCT g.id) AS total_grados,
    COUNT(DISTINCT mat.id) AS total_matriculas,
    (SELECT SUM(monto) FROM pagos WHERE colegio_id = c.id AND estado = 'pagado') AS total_recaudado,
    (SELECT COUNT(*) FROM pagos WHERE colegio_id = c.id AND estado = 'vencido') AS pagos_vencidos
FROM colegios c
LEFT JOIN usuarios u ON c.id = u.colegio_id
LEFT JOIN grados g ON c.id = g.colegio_id
LEFT JOIN matriculas mat ON c.id = mat.colegio_id
GROUP BY c.id;

-- 12. Buscar estudiantes con bajo rendimiento académico
SELECT 
    u.nombre AS estudiante,
    g.nombre AS grado,
    AVG(c.calificacion) AS promedio_general,
    COUNT(c.id) AS total_evaluaciones,
    SUM(CASE WHEN c.calificacion < 60 THEN 1 ELSE 0 END) AS evaluaciones_insuficientes
FROM usuarios u
JOIN calificaciones c ON u.id = c.estudiante_id
JOIN matriculas m ON u.id = m.estudiante_id
JOIN grados g ON m.grado_id = g.id
WHERE u.colegio_id = 1 AND u.rol = 'estudiante'
GROUP BY u.id, g.id
HAVING promedio_general < 70 OR evaluaciones_insuficientes > 0
ORDER BY promedio_general ASC;

-- 13. Consulta de disponibilidad de aulas en fecha y hora específica
SELECT 
    a.nombre AS aula,
    a.capacidad,
    a.edificio,
    a.piso,
    a.estado
FROM aulas a
WHERE a.colegio_id = 1 
AND a.estado = 'disponible'
AND a.id NOT IN (
    SELECT DISTINCT h.aula_id
    FROM horarios h
    WHERE h.colegio_id = 1 
    AND h.dia_semana = 'Lunes'
    AND (
        (h.hora_inicio <= '10:00:00' AND h.hora_fin > '10:00:00') OR
        (h.hora_inicio < '11:00:00' AND h.hora_fin >= '11:00:00') OR
        (h.hora_inicio >= '10:00:00' AND h.hora_fin <= '11:00:00')
    )
)
ORDER BY a.capacidad;

-- 14. Historial de actividades de usuarios (bitácora) con detalles
SELECT 
    b.fecha_registro,
    c.nombre AS colegio,
    u.nombre AS usuario,
    u.rol,
    b.accion,
    b.modulo,
    b.descripcion,
    b.ip_address
FROM bitacora b
LEFT JOIN colegios c ON b.colegio_id = c.id
LEFT JOIN usuarios u ON b.usuario_id = u.id
ORDER BY b.fecha_registro DESC
LIMIT 20;