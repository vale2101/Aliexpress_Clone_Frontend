/**
 * Configuración centralizada de la API
 * Contiene todas las URLs y endpoints del backend
 */

import { ENV } from './env';

export const API_CONFIG = {
  BASE_URL: ENV.API_URL,
  BACKEND_URL: ENV.BACKEND_URL,
  TIMEOUT: ENV.API_TIMEOUT,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/user/login',
      REGISTER: '/user/createUser',
      LOGOUT: '/user/logout',
      CHECK_AUTH: '/user/getUsers',
    },
    USER: {
      PROFILE: '/user/findUserById',
      UPDATE: '/user/updateUser',
      GET_ALL: '/user/getUsers',
    },
    PRODUCTS: {
      GET_ALL: '/producto/obtenerProductos',
      GET_BY_ID: '/producto/obtenerProducto',
    }
  }
} as const;

/**
 * Construye una URL completa para un endpoint
 * @param endpoint - El endpoint relativo
 * @returns URL completa
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

/**
 * Configuración de headers por defecto
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const;

/**
 * Opciones de fetch por defecto
 */
export const DEFAULT_FETCH_OPTIONS: RequestInit = {
  headers: DEFAULT_HEADERS,
  credentials: 'include',
} as const;
