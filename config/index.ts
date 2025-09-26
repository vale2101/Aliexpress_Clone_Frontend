/**
 * Punto de entrada para toda la configuración
 * Exporta todas las configuraciones de forma centralizada
 */

// Configuración principal
export * from './api';
export * from './env';
export * from './types';

// Re-exportar constantes importantes
export { API_CONFIG, buildApiUrl, DEFAULT_HEADERS, DEFAULT_FETCH_OPTIONS } from './api';
export { ENV, isDevelopment, isProduction, isTest } from './env';
