import { ENV } from "../config/env";
import { LoginRequest, RegisterRequest } from "../interfaces/user.interface";

const API_URL = ENV.API_URL;

export const AuthService = {
  async register(data: RegisterRequest): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const text = await res.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("El servidor no devolvió una respuesta válida: " + text);
    }

    if (!res.ok) throw new Error(result.message || "Error al registrar usuario");
    return result;
  },

  async login(credentials: LoginRequest): Promise<{ message: string }> {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("El servidor no devolvió una respuesta JSON válida: " + text);
      }

      if (!res.ok) throw new Error(data.message || "Error en el inicio de sesión");
      return data;
    } catch (error: any) {
      console.error("Error en login:", error);
      throw new Error(error.message || "Error desconocido al iniciar sesión");
    }
  },

  async getProfile(): Promise<any> {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "GET",
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: No se pudo obtener el perfil`);
      }
      
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("El servidor no devolvió una respuesta JSON válida: " + text);
      }
      
      return data;
    } catch (error: any) {
      console.error("Error obteniendo perfil:", error);
      throw new Error(error.message || "Error al obtener el perfil");
    }
  },

  async logout(): Promise<{ message: string }> {
    try {
      const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: Error al cerrar sesión`);
      }
      
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("El servidor no devolvió una respuesta JSON válida: " + text);
      }
      
      return data;
    } catch (error: any) {
      console.error("Error en logout:", error);
      throw new Error(error.message || "Error al cerrar sesión");
    }
  },
};
