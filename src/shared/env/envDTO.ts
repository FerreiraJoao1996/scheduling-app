export enum NODE_TYPES {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  HOMOLOG = 'homolog',
  TEST = 'test',
}

export interface IEnv {
  NODE_ENV: NODE_TYPES;

  PORT: number;
  HOST: string;

  DB_TYPE: 'MariaDB' | 'MySQL';
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;

  AWS_REGION: string;
  AWS_ENDPOINT: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_KEY_ID: string;

  REDIS_HOST: string;
  REDIS_PORT: number;
}
