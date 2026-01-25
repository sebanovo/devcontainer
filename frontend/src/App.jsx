import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, CreateTenant } from './pages';
import { NotFoundPage } from './pages/fallback';
import {
  LandingPageTenant,
  LoginPageTenant,
  SignUpPageTenant,
  PanelAdminPageTenant,
} from './tenant/pages';
import { TenantGuard } from './guards';
import { validateHost, getSubdomain } from './utils/hosts';
import { ProtectedRouteTenant } from './tenant/secure';

function App() {
  const isHost = validateHost(window.location.hostname);
  if (!isHost) return <NotFoundPage />;

  const subdomain = getSubdomain(window.location.hostname);
  const isTenant = !!subdomain;

  if (isTenant) {
    return (
      <BrowserRouter>
        <TenantGuard>
          <Routes>
            <Route path='/' element={<LandingPageTenant />} />
            <Route path='/login' element={<LoginPageTenant />} />
            <Route path='/signup' element={<SignUpPageTenant />} />
            <Route
              path='/panel-admin'
              element={
                <ProtectedRouteTenant>
                  <PanelAdminPageTenant />
                </ProtectedRouteTenant>
              }
            />
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
