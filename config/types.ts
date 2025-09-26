/**
 * Tipos e interfaces centralizadas para la aplicación
 */

// ===== TIPOS DE USUARIO =====
export interface User {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: number;
  estado: 'activo' | 'suspendido' | 'eliminado';
}

export interface LoginRequest {
  email: string;
  contrasena: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
  telefono?: string;
  rol: number;
  estado?: 'activo' | 'suspendido' | 'eliminado';
}

export interface AuthResponse {
  message: string;
  user?: User;
  success?: boolean;
}

// ===== TIPOS DE PRODUCTO =====
export interface Product {
  id_producto?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  precio_original?: number;
  descuento?: number;
  moneda?: string;
  stock: number;
  estado?: 'activo' | 'inactivo';
  fecha_publicacion?: string;
  material?: string;
  color?: string;
  peso?: number;
  dimensiones?: string;
  descripcionCom?: string;
  imagen_url?: string;
}

// ===== TIPOS DE API =====
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// ===== TIPOS DE CONFIGURACIÓN =====
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
}

// ===== TIPOS DE SERVICIOS =====
export interface ServiceResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}
