import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateTenant from './pages/CreateTenant';
import LandingPageTenant from './tenant/pages/LandingPageTenant';
import LoginPageTenant from './tenant/pages/LoginPageTenant';
import SignUpPageTenant from './tenant/pages/SignUpPageTenant';
import TenantGuard from './guards/TenantGuard';
import { getSubdomain, validateHost } from './utils';
import NotFoundPage from './pages/fallback/NotFoundPage';
import PanelAdminPageTenant from './tenant/pages/PanelAdminPageTenant';

function App() {
  // Detectar subdominio
  // const host = window.location.hostname; // ejemplo: acme.localhost
  const isHost = validateHost(window.location.hostname);
  if (!isHost) return <NotFoundPage />;
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
            <Route path='/panel-admin' element={<PanelAdminPageTenant />} />
            <Route path='/login' element={<LoginPageTenant />} />
            <Route path='/signup' element={<SignUpPageTenant />} />
            <Route path='*' element={<NotFoundPage />} />
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
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
