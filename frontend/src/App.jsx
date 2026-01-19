import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { getApp } from './helpers';
import Env from './constants/env';

function AppHome() {
  return (
    <div>
      <h1>Hola app</h1>
      {/* <img src='/static/mark.jpg'></img> */}
      <img src={Env.VITE_API_URL + '/static/mark.jpg'}></img>
      <img src={Env.VITE_API_URL + '/static/mark.jpg'}></img>
      <h1>{Env.VITE_SYSTEM_NAME}</h1>
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
