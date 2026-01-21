import { AdminRouter, AppRouter } from './App';

export const APPS = [
  {
    subdomain: 'www',
    app: AppRouter,
    main: true,
  },
  {
    subdomain: 'aleman',
    app: AdminRouter,
    main: false,
  },
];
