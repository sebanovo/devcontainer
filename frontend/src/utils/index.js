import Env from '../constants/env';

export function validateHost(hostname) {
  return (
    hostname.endsWith('.nip.io') ||
    hostname.endsWith('.sslip.io') ||
    hostname.endsWith('.localhost') ||
    hostname === 'localhost'
  );
}

/*
Importante si no hay subdominio devuelve null
En caso que lo halla devuelve el texto simplemente
En producción usar siempre el dominio .nip.io o .sslip.io
nunca usar la ip propia porque no va a funcionar
*/
export function getSubdomain(hostname) {
  const parts = hostname.split('.');

  // Caso localhost
  if (hostname === 'localhost') return null;

  // localhost con subdominio → tenant.localhost
  if (hostname.endsWith('.localhost')) {
    return parts.slice(0, -1).join('') || null;
  }

  if (hostname.endsWith('.localhost.nip.io') || hostname.endsWith('.localhost.sslip.io')) {
    // quitar los últimos 6 elementos: localhost.nip.io
    // ej: tenant.localhost.nip.io → ["tenant"]
    return parts.slice(0, -3).join('') || null;
  }

  // nip.io o sslip.io → tenant.127.0.0.1.nip.io
  if (hostname.endsWith('.nip.io') || hostname.endsWith('.sslip.io')) {
    // quitar los últimos 6 elementos: x.x.x.x.nip.io
    // ej: tenant.127.0.0.1.nip.io → ["tenant"]
    return parts.slice(0, -6).join('') || null;
  }

  // Dominio normal → tenant.midominio.com
  // if (parts.length >= 3) {
  //   return parts.slice(0, -2).join('.');
  // }

  return null;
}
