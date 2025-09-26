/**
 * Punto de entrada para todos los servicios
 * Exporta todos los servicios y utilidades de forma centralizada
 */

// Servicios principales
export { authService, default as auth } from './authService';
export { productService, ProductService } from './productService';

// Utilidades
export * from './utils';

// Re-exportar tipos para conveniencia
export type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  Product,
  ApiResponse,
  ServiceResponse,
  SearchParams,
  PaginationParams,
} from '../config/types';
