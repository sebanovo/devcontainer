import { useEffect, useState } from 'react';
import NotSubdomainRegisterPage from '../pages/fallback/NotSubdomainRegisterPage';
import { getSubdomain } from '../utils';
import Env from '../constants/env';

export default function TenantGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [validTenant, setValidTenant] = useState(true); // default true

  useEffect(() => {
    const checkTenant = async () => {
      const subdomain = getSubdomain(window.location.hostname);

      // 👉 Si NO hay subdominio, es dominio principal → permitir acceso
      if (!subdomain) {
        setValidTenant(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://${Env.VITE_HOST}:8000/api/v1/domains`);
        const data = await res.json();

        const exists = data.some((d) => getSubdomain(d.domain) === subdomain);

        setValidTenant(exists);
      } catch (err) {
        console.error('Error validando tenant', err);
        setValidTenant(false);
      } finally {
        setLoading(false);
      }
    };

    checkTenant();
  }, []);

  if (loading) return <p>Cargando...</p>;

  if (!validTenant) {
    return <NotSubdomainRegisterPage />;
  }

  return children;
}
