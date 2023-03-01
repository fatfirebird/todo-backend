const isProducation = process.env.NODE_ENV === 'production';

export const APP_CONFIG = {
  PORT: process.env.PORT ?? 3000,
  // TODO: cors
  ORIGIN: isProducation ? '' : '*',
};
