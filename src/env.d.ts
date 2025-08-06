interface ImportMetaEnv {
  readonly EMAIL_USER: string;
  readonly EMAIL_PASS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL_USER: string;
      EMAIL_PASS: string;
    }
  }
}

export {};
