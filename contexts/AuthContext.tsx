"use client";
import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { UserService } from "../services/userService";
import { User, CreateUserRequest } from "../interfaces/user.interface";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, contrasena: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  register: (newUser: CreateUserRequest) => Promise<void>; // 🔹 corrección aquí
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const users = await UserService.getUsers();
        if (users.length > 0) {
          setUser(users[0]);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, contrasena: string) => {
    setLoading(true);
    try {
      const response = await UserService.login({ email, contrasena });
      // Si el backend devuelve los datos del usuario logueado:
      if (response.data?.user) {
        setUser(response.data.user);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await UserService.logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register usando CreateUserRequest
  const register = async (newUser: CreateUserRequest) => {
    setLoading(true);
    try {
      await UserService.createUser({
        ...newUser,
        rol: 2, // Asignado automáticamente
        estado: "activo", // por defecto
      });
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        register, // 🔹 disponible para usar
      }}
    >
      {loading ? <p>Cargando...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un AuthProvider");
  }
  return context;
};
