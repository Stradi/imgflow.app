declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_ACCESS_SECRET: string;
      CF_R2_ENDPOINT: string;
      CF_R2_ACCESS_KEY_ID: string;
      CF_R2_SECRET_ACCESS_KEY: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
      LEMONSQUEEZY_API_KEY: string;
      LEMONSQUEEZY_STORE_ID: string;
      LEMONSQUEEZY_WEBHOOK_SECRET: string;
    }
  }
}

export {};
