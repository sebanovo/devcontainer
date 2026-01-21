import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Env from './constants/env';
import LandingPage from './pages/LandingPage';
import CreateTenant from './pages/CreateTenant';
import LandingPageTenant from './tenant/pages/LandingPageTenant';
import LoginPageTenant from './tenant/pages/LoginPageTenant';
import SignUpPageTenant from './tenant/pages/SignUpPageTenant';

function AppHome() {
  return (
    <div>
      <img src={`${Env.VITE_API_URL}/static/mark.jpg`}></img>
      <img src={`${Env.VITE_API_URL}/static/mark.jpg`}></img>
      <h1>{Env.VITE_SYSTEM_NAME}</h1>
    </div>
  );
}

function AdminHome() {
  return <h1>Hola Aleman</h1>;
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
  // // const CurrentApp = getApp();
  // // console.log({ app: CurrentApp });
  // return (
  //   // <BrowserRouter>
  //   //   <CurrentApp />
  //   // </BrowserRouter>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path='/' element={<LandingPage />} />
  //       <Route path='/create-tenant' element={<CreateTenant />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
  // Detectar subdominio
  const host = window.location.hostname; // ejemplo: acme.localhost
  const subdomain = host.split('.')[0];

  // Si subdomain es distinto del principal (localhost), cargamos el tenant
  const isTenant = subdomain && subdomain !== Env.VITE_HOST;
  if (isTenant) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPageTenant />} />
          <Route path='/login' element={<LoginPageTenant />} />
          <Route path='/signup' element={<SignUpPageTenant />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/create-tenant' element={<CreateTenant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
