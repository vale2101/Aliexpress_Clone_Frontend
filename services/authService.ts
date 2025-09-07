import { API_CONFIG } from '../config/api';

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

export interface User {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: number;
  estado: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
}

class AuthService {
  private loginUrl = 'http://localhost:3000/api/user/login';
  private registerUrl = 'http://localhost:3000/api/user/createUser';
  private profileUrl = 'http://localhost:3000/api/user/findUserById';
  private updateUrl = 'http://localhost:3000/api/user/updateUser';

  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const defaultOptions: RequestInit = {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Importante para cookies
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {}
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          'No se puede conectar con el servidor. Verifica que el backend esté corriendo en el puerto 3000.'
        );
      }
      throw error;
    }
  }

  // LOGIN
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>(this.loginUrl, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>(this.registerUrl, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // OBTENER PERFIL
  async getProfile(userId: number): Promise<{ data: User }> {
    return this.makeRequest<{ data: User }>(`${this.profileUrl}/${userId}`);
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>(`${this.updateUrl}/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // CHECK AUTH
  async checkAuth(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3000/api/user/getUsers', {
        credentials: 'include',
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // LOGOUT
  async logout(): Promise<void> {
    localStorage.removeItem('user');
  }
}

export const authService = new AuthService();
export default authService;
