
export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',

  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'AliExpress Clone',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  APP_ENV: process.env.NODE_ENV || 'development',

  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  API_RETRY_ATTEMPTS: parseInt(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || '3'),

  CACHE_TTL: parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '300000'), // 5 minutos

  DEFAULT_PAGE_SIZE: parseInt(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE || '20'),
  MAX_PAGE_SIZE: parseInt(process.env.NEXT_PUBLIC_MAX_PAGE_SIZE || '100'),

  DEFAULT_CURRENCY: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'COP',
  DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'es-CO',
} as const;


export function validateEnv(): void {
  const requiredVars = [
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_BACKEND_URL',
    'NEXT_PUBLIC_APP_NAME',
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn(
      `⚠️ Faltan variables de entorno opcionales: ${missingVars.join(', ')}.\n` +
      `Se usarán valores por defecto definidos en el archivo env.ts.`
    );
  }
}


export const isDevelopment = ENV.APP_ENV === 'development';
export const isProduction = ENV.APP_ENV === 'production';
export const isTest = ENV.APP_ENV === 'test';


if (typeof window === 'undefined') {
  validateEnv();
}
