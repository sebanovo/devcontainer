import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { getApp } from './helpers';

function AppHome() {
  return (
    <div>
      <h1>Hola app</h1>
      <img src='http://localhost:8000/static/mark.jpg'></img>
    </div>
  );
}

function AdminHome() {
  return <h1>Hola Admin</h1>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<AppHome />}></Route>
    </Routes>
  );
}

export function AdminRouter() {
  return (
    <Routes>
      <Route path='/' element={<AdminHome />}></Route>
    </Routes>
  );
}
function App() {
  const CurrentApp = getApp();
  console.log({ app: CurrentApp });
  return (
    <BrowserRouter>
      <CurrentApp />
    </BrowserRouter>
  );
}

export default App;

/*
DNS comodin 

Configurar DNS wildcard.
*/
