/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SYSTEM_NAME: string;
  readonly VITE_SERVER_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
