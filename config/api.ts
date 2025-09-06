// Configuración de la API del backend
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/user/login',
      REGISTER: '/user/createUser',
      LOGOUT: '/user/logout',
    },
    USER: {
      PROFILE: '/user/findUserById',
      UPDATE: '/user/updateUser',
    }
  }
};

// Función para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
