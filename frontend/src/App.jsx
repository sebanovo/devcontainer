import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    fetch('/api/v1/alumnos/')
      .then((response) => response.json())
      .then((data) => setAlumnos(data))
      .catch((error) => console.error('Error al cargar alumnos:', error));
  }, []);

  return (
    <>
      <h1>Lista de Alumnos</h1>
      <ul>
        {alumnos.map((alumno, i) => (
          <div key={i}>
            <li key={alumno.id}>
              {alumno.nombre} - {alumno.edad} años
            </li>
            <img width='100' src={alumno.foto} alt={`foto de ${alumno.nombre}`} />
          </div>
        ))}
        <img width='100' src='static/mark.jpg' alt='foto de mark' />
        <img width='100' src='media/alumnos/mark.jpg' alt='foto de mark' />
      </ul>
    </>
  );
}

export default App;
