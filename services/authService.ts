import { API_CONFIG, buildApiUrl, DEFAULT_FETCH_OPTIONS } from '../config/api';
import { 
  LoginRequest, 
  RegisterRequest, 
  User, 
  AuthResponse, 
  ApiResponse,
  ServiceResponse 
} from '../config/types';

class AuthService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Realiza una petición HTTP con manejo de errores centralizado
   * @param url - URL completa del endpoint
   * @param options - Opciones de fetch
   * @returns Promise con la respuesta parseada
   */
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const response = await fetch(url, {
        ...DEFAULT_FETCH_OPTIONS,
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.warn('No se pudo parsear el error:', parseError);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('La petición tardó demasiado tiempo');
        }
        if (error.message.includes('fetch')) {
          throw new Error(
            'No se puede conectar con el servidor. Verifica que el backend esté corriendo.'
          );
        }
      }
      throw error;
    }
  }

  /**
   * Inicia sesión de usuario
   * @param credentials - Credenciales de login
   * @returns Respuesta de autenticación
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN);
    return this.makeRequest<AuthResponse>(url, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  /**
   * Registra un nuevo usuario
   * @param userData - Datos del usuario a registrar
   * @returns Respuesta de registro
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER);
    return this.makeRequest<AuthResponse>(url, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Obtiene el perfil de un usuario por ID
   * @param userId - ID del usuario
   * @returns Datos del usuario
   */
  async getProfile(userId: number): Promise<ApiResponse<User>> {
    const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.USER.PROFILE}/${userId}`);
    return this.makeRequest<ApiResponse<User>>(url);
  }

  /**
   * Actualiza los datos de un usuario
   * @param userId - ID del usuario
   * @param userData - Datos a actualizar
   * @returns Respuesta de actualización
   */
  async updateUser(userId: number, userData: Partial<User>): Promise<AuthResponse> {
    const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.USER.UPDATE}/${userId}`);
    return this.makeRequest<AuthResponse>(url, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si está autenticado, false en caso contrario
   */
  async checkAuth(): Promise<boolean> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.CHECK_AUTH);
      const response = await fetch(url, DEFAULT_FETCH_OPTIONS);
      return response.ok;
    } catch {
      return false;
    }
  }


  async logout(): Promise<void> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
      await fetch(url, {
        ...DEFAULT_FETCH_OPTIONS,
        method: 'POST',
      });
    } catch (error) {
      console.warn('Error al hacer logout en el servidor:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
}

export const authService = new AuthService();
export default authService;
