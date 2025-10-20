"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AuthService } from "../services/authService";
import { User, LoginRequest, RegisterRequest } from "../interfaces/user.interface";

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
  if (!context) throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const userData = await AuthService.getProfile();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("No hay sesión activa o error al verificar perfil:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      clearError();

      const response = await AuthService.login(credentials);
      if (response.message === "Login exitoso") {
        setIsAuthenticated(true);
        // Esperar un poco para que la cookie se establezca correctamente
        setTimeout(async () => {
          try {
            const userData = await AuthService.getProfile();
            setUser(userData);
          } catch (profileError) {
            console.error("Error obteniendo perfil:", profileError);
            // Si falla el perfil, pero el login fue exitoso, mantener la autenticación
            setUser({
              id: 1,
              email: credentials.email,
              nombre: "Usuario",
              apellido: "Autenticado",
              rol: 1
            });
          }
        }, 100);
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (err: any) {
      console.error("❌ Error login:", err);
      setError(err.message || "Error al iniciar sesión");
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true);
      clearError();
      await AuthService.register(userData);
      await login({ email: userData.email, contrasena: userData.contrasena });
    } catch (err: any) {
      console.error("❌ Error register:", err);
      setError(err.message || "Error al registrarse");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err: any) {
      setError(err.message || "Error al cerrar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, register, logout, error, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
