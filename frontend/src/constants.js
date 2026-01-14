import { AdminRouter, AppRouter } from './App';

export const APPS = [
  {
    subdomain: 'www',
    app: AppRouter,
    main: true,
  },
  {
    subdomain: 'admin',
    app: AdminRouter,
    main: false,
  },
];
