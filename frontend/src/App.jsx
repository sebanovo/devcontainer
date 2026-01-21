import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateTenant from './pages/CreateTenant';
import LandingPageTenant from './tenant/pages/LandingPageTenant';
import LoginPageTenant from './tenant/pages/LoginPageTenant';
import SignUpPageTenant from './tenant/pages/SignUpPageTenant';
import TenantGuard from './guards/TenantGuard';
import { getSubdomain, validateHost } from './utils';
import NotFound from './pages/fallback/NotFound';

function App() {
  // Detectar subdominio
  // const host = window.location.hostname; // ejemplo: acme.localhost
  const isHost = validateHost(window.location.hostname);
  if (!isHost) return <NotFound />;
  const subdomain = getSubdomain(window.location.hostname);
  const isTenant = !!subdomain;

  // Si subdomain es distinto del principal (localhost), cargamos el tenant
  // const isTenant = subdomain && subdomain !== Env.VITE_HOST;
  if (isTenant) {
    return (
      <BrowserRouter>
        <TenantGuard>
          <Routes>
            <Route path='/' element={<LandingPageTenant />} />
            <Route path='/login' element={<LoginPageTenant />} />
            <Route path='/signup' element={<SignUpPageTenant />} />
          </Routes>
        </TenantGuard>
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
