interface ImportMetaEnv {
  readonly ENDPOINT: string;
  readonly GH_APIKEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
