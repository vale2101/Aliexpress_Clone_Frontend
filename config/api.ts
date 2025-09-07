export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
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

export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
