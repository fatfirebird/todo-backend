export const isProducation = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

export const APP_CONFIG = {
  PORT: process.env.PORT ?? 3000,
  ORIGIN: isProducation ? '*' : '*',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};
