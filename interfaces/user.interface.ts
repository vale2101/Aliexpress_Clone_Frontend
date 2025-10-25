export type UserEstado = 'activo' | 'suspendido' | 'eliminado';

export interface User {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: string;
  estado: UserEstado;
}

export interface CreateUserRequest {
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
  telefono?: string;
  rol?: 2;
  estado?: UserEstado; 
}

export interface CreateVendedorRequest {
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
  telefono?: string;
  rol: "3";
  estado?: UserEstado; 
}

export interface UpdateUserRequest {
  nombre?: string;
  apellido?: string;
  email?: string;
  contrasena?: string;
  telefono?: string;
  rol?: string;
  estado?: UserEstado;
}

export interface LoginRequest {
  email: string;
  contrasena: string;
}

export interface ApiResponse<T = any> {
  message: string;
  data?: T; 
}

export interface LoginResponse {
  message: string;
  user?: User;
}
