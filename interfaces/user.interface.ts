export interface User {
  id: number;
  id_usuario?: number;
  nombre: string;
  apellido: string;
  email: string;
  contrasena?: string; 
  telefono?: string;
  fecha_registro?: string;
  rol: number;
  estado?: 'activo' | 'suspendido' | 'eliminado';
}

export interface AuthResponse {
  token: string;
  user: User;
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
}
