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
      const url = `${API_URL}/login`;
      console.log("🔍 Intentando hacer login en:", url);
      console.log("🔍 Credenciales:", { email: credentials.email, contrasena: "***" });
      
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      
      console.log("📡 Respuesta del servidor:", {
        status: res.status,
        statusText: res.statusText,
        url: res.url
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
    // Como no hay ruta /profile en el backend, simulamos un perfil básico
    // En un proyecto real, podrías obtener esto de localStorage o de otra fuente
    try {
      // Simular obtención de perfil desde localStorage o cookie
      const userData = {
        id: 1,
        email: "usuario@example.com",
        nombre: "Usuario",
        apellido: "Autenticado",
        rol: 1,
        telefono: "",
        fecha_registro: new Date().toISOString()
      };
      
      console.log("📋 Perfil simulado:", userData);
      return userData;
    } catch (error: any) {
      console.error("Error obteniendo perfil:", error);
      throw new Error(error.message || "Error al obtener el perfil");
    }
  },

  async logout(): Promise<{ message: string }> {
    // Como no hay ruta /logout en el backend, simulamos el logout
    // En un proyecto real, podrías limpiar localStorage, cookies, etc.
    try {
      console.log("🚪 Logout simulado - limpiando sesión local");
      
      // Simular limpieza de sesión
      // En un proyecto real, aquí limpiarías cookies, localStorage, etc.
      
      return { message: "Logout exitoso" };
    } catch (error: any) {
      console.error("Error en logout:", error);
      throw new Error(error.message || "Error al cerrar sesión");
    }
  },
};
