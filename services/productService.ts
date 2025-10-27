import { ENV } from "../config/env";

const API_URL = ENV.API_URL;
import { ProductoInterface } from "../interfaces/product.interface";

interface ApiResponse<T> {
  message?: string;
  error?: string;
  data?: T;
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const json: ApiResponse<T> = await response.json();
  if (!response.ok) {
    throw new Error(json.message || json.error || "Error en la respuesta del servidor");
  }
  return json.data as T;
}

export const productService = {
  async getAll(): Promise<ProductoInterface[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`${API_URL}/producto/obtenerProductos`, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const productos = await parseApiResponse<ProductoInterface[]>(response);
      return Array.isArray(productos) ? productos : [];
    } catch (error) {
      console.error("❌ Error en productService.getAll:", error);
      return [];
    }
  },

  async getById(id: number): Promise<ProductoInterface | null> {
    try {
      const response = await fetch(`${API_URL}/producto/obtenerProducto/${id}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      const producto = await parseApiResponse<ProductoInterface>(response);
      return producto;
    } catch (error) {
      console.error("❌ Error en productService.getById:", error);
      return null;
    }
  },

  async create(producto: ProductoInterface): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/producto/crearProducto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(producto),
      });

      await parseApiResponse<null>(response);
      return true;
    } catch (error) {
      console.error("❌ Error en productService.create:", error);
      return false;
    }
  },

  async update(id: number, producto: ProductoInterface): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/producto/actualizarProducto/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(producto),
      });

      await parseApiResponse<null>(response);
      return true;
    } catch (error) {
      console.error("❌ Error en productService.update:", error);
      return false;
    }
  },

  async changeState(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/producto/cambiarEstadoProducto/${id}`, {
        method: "PATCH",
        headers: { Accept: "application/json" },
      });

      await parseApiResponse<null>(response);
      return true;
    } catch (error) {
      console.error("❌ Error en productService.changeState:", error);
      return false;
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/producto/eliminarProducto/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      await parseApiResponse<null>(response);
      return true;
    } catch (error) {
      console.error("❌ Error en productService.delete:", error);
      return false;
    }
  },
};