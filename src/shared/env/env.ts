import dotenv from "dotenv";
dotenv.config();
import { IEnv, NODE_TYPES } from './envDTO';


const env: IEnv = {
    NODE_ENV: getEnv('NODE_ENV', 'development') as NODE_TYPES,

    HOST: getEnv('HOST', 'localhost'),
    PORT: getNumberEnv('PORT', 5001),

    DB_TYPE: 'MariaDB',
    DB_HOST: getEnv('DB_HOST', 'localhost'),
    DB_PORT: getNumberEnv('DB_PORT', 3306),
    DB_DATABASE: getEnv('DB_DATABASE', 'atmhomedb'),
    DB_USER: getEnv('DB_USER', 'atmhome'),
    DB_PASSWORD: getEnv('DB_PASSWORD', undefined),
    
    AWS_REGION: getEnv('AWS_REGION', undefined),
    AWS_ENDPOINT: getEnv('AWS_ENDPOINT', undefined),
    AWS_ACCESS_KEY_ID: getEnv('AWS_ACCESS_KEY_ID', undefined),
    AWS_SECRET_KEY_ID: getEnv('AWS_SECRET_KEY_ID', undefined),

    REDIS_HOST: getEnv('REDIS_HOST', undefined),
    REDIS_PORT: getNumberEnv('REDIS_PORT', 6379),

    JWT_SECRET: getEnv('JWT_SECRET', undefined),
    JWT_ACCESS_EXPIRATION_TIME: getEnv('JWT_ACCESS_EXPIRATION_TIME', undefined),
    JWT_REFRESH_EXPIRATION_TIME: getEnv('JWT_REFRESH_EXPIRATION_TIME', undefined),
};

function getEnv(key: string, defaultValue: any): string {
  if (!process.env[key]) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }

    console.log(`A chave ${key} não foi definida no arquivo .env`);
    process.exit(1);
  }

  return process.env[key];
}

function getNumberEnv(key: string, defaultValue: number | null): number {
  const value = getEnv(key, defaultValue);

  if (isNaN(Number(value))) {
    console.log(`O valor da chave ${key} do arquivo .env não é numérica`);
    process.exit(1);
  }

  return Number(value);
}

function getBooleanEnv(key: string, defaultValue: boolean | null): boolean {
  const value = getEnv(key, defaultValue);

  if (typeof value === 'boolean') return value;

  if (
    value === null ||
    value === undefined ||
    (value.toUpperCase() !== 'TRUE' &&
      value.toUpperCase() !== 'FALSE' &&
      value.toUpperCase() !== 'T' &&
      value.toUpperCase() !== 'F' &&
      value.toUpperCase() !== 'S' &&
      value.toUpperCase() !== 'N' &&
      value !== '1' &&
      value !== '0')
  ) {
    console.log(`O valor da chave ${key} do arquivo .env não é booleana`);
    process.exit(1);
  }

  return value === '1' || value.toUpperCase() === 'TRUE' || value.toUpperCase() === 'T' || value.toUpperCase() === 'S';
}

export { env };
