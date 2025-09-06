import { API_CONFIG, buildApiUrl } from '../config/api';

// Interfaces para los tipos de datos
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
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  // Función para hacer peticiones HTTP
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = buildApiUrl(endpoint);
    
    console.log(`🔄 Making request to: ${url}`);
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Incluir cookies en las peticiones
    };

    try {
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      });

      console.log(`📡 Response status: ${response.status}`);

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.error('❌ Error response:', errorData);
        } catch (parseError) {
          console.error('❌ Could not parse error response');
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('✅ Request successful');
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('🌐 Network error - Is the backend running?');
        throw new Error('No se puede conectar con el servidor. Verifica que el backend esté corriendo en el puerto 3001.');
      }
      throw error;
    }
  }

  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.makeRequest<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        {
          method: 'POST',
          body: JSON.stringify(credentials),
        }
      );
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  // Registro
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await this.makeRequest<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        {
          method: 'POST',
          body: JSON.stringify(userData),
        }
      );
      return response;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  // Obtener perfil del usuario
  async getProfile(userId: number): Promise<{ data: User }> {
    try {
      const response = await this.makeRequest<{ data: User }>(
        `${API_CONFIG.ENDPOINTS.USER.PROFILE}/${userId}`
      );
      return response;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw error;
    }
  }

  // Verificar si el usuario está autenticado
  async checkAuth(): Promise<boolean> {
    try {
      // Hacer una petición simple para verificar si hay token válido
      const response = await fetch(buildApiUrl('/user/getUsers'), {
        credentials: 'include',
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Logout (limpiar cookies del lado del cliente)
  async logout(): Promise<void> {
    try {
      // El backend maneja el logout limpiando las cookies
      // Aquí solo limpiamos el localStorage si es necesario
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }
}

// Exportar una instancia singleton
export const authService = new AuthService();
export default authService;
