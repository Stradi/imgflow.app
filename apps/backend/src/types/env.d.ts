declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      CF_R2_ENDPOINT: string;
      CF_R2_ACCESS_KEY_ID: string;
      CF_R2_SECRET_ACCESS_KEY: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
    }
  }
}

export {};
