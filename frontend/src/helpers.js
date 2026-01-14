import { APPS } from './constants';

export const getApp = () => {
  const hostname = window.location.hostname;
  const subdomain = getSubdomain(hostname);
  const main = APPS.find((app) => app.main);
  if (!main) throw new Error('Must have main app');
  if (subdomain === '') return main.app;
  const app = APPS.find((app) => subdomain === app.subdomain);
  if (!app) return main.app;
  return app.app;
};

export const getSubdomain = (location) => {
  const locationParts = location.split('.');
  let sliceFill = -2;
  const isLocalHost = locationParts.slice(-1)[0] === 'localhost';
  if (isLocalHost) sliceFill = -1;
  return locationParts.slice(0, sliceFill).join('.');
};
