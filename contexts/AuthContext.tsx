"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, LoginRequest, RegisterRequest } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Verificar autenticación al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const isAuth = await authService.checkAuth();
        
        if (isAuth) {
          // Si está autenticado, intentar obtener el perfil del usuario
          // Por ahora, solo verificamos que el token existe
          // En una implementación completa, podrías decodificar el JWT para obtener el userId
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      if (response.message === 'Login exitoso') {
        // Obtener información del usuario después del login exitoso
        // Por ahora, creamos un objeto de usuario básico
        // En una implementación completa, el backend debería devolver la información del usuario
        const userData: User = {
          id_usuario: 0, // Esto debería venir del backend
          nombre: credentials.email.split('@')[0], // Temporal
          apellido: '',
          email: credentials.email,
          rol: 1, // Rol por defecto
          estado: 'activo'
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error: any) {
      setError(error.message || 'Error al iniciar sesión');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.register(userData);
      
      if (response.message === 'Usuario creado correctamente') {
        // Después del registro exitoso, hacer login automático
        await login({
          email: userData.email,
          contrasena: userData.contrasena
        });
      }
    } catch (error: any) {
      setError(error.message || 'Error al registrarse');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error: any) {
      setError(error.message || 'Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
