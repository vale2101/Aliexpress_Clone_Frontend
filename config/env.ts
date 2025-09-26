/**
 * Configuración de variables de entorno
 * Centraliza y valida todas las variables de entorno de la aplicación
 */

/**
 * Variables de entorno de la aplicación
 */
export const ENV = {
  // URLs de la API
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
  
  // Configuración de la aplicación
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'AliExpress Clone',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  APP_ENV: process.env.NODE_ENV || 'development',
  
  // Configuración de la API
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  API_RETRY_ATTEMPTS: parseInt(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || '3'),
  
  // Configuración de caché
  CACHE_TTL: parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '300000'), // 5 minutos
  
  // Configuración de paginación
  DEFAULT_PAGE_SIZE: parseInt(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE || '20'),
  MAX_PAGE_SIZE: parseInt(process.env.NEXT_PUBLIC_MAX_PAGE_SIZE || '100'),
  
  // Configuración de moneda
  DEFAULT_CURRENCY: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'COP',
  DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'es-CO',
} as const;

/**
 * Valida que las variables de entorno requeridas estén presentes
 */
export function validateEnv(): void {
  const requiredVars = [
    'NEXT_PUBLIC_API_URL',
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn(
      `⚠️ Variables de entorno faltantes: ${missingVars.join(', ')}\n` +
      'Usando valores por defecto.'
    );
  }
}

/**
 * Verifica si estamos en modo desarrollo
 */
export const isDevelopment = ENV.APP_ENV === 'development';

/**
 * Verifica si estamos en modo producción
 */
export const isProduction = ENV.APP_ENV === 'production';

/**
 * Verifica si estamos en modo test
 */
export const isTest = ENV.APP_ENV === 'test';

// Validar variables de entorno al cargar el módulo
if (typeof window === 'undefined') {
  validateEnv();
}
