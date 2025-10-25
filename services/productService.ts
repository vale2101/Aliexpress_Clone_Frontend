import { ENV } from "../config/env";

const API_URL = ENV.API_URL;

export interface ProductoInterface {
  id_producto?: number; 
  nombre: string;
  descripcion?: string;
  precio: number;
  precio_original?: number;
  descuento?: number;
  moneda?: string;
  stock: number;
  estado?: "activo" | "inactivo";
  fecha_publicacion?: string;
  material?: string;
  color?: string;
  peso?: number;
  dimensiones?: string;
  descripcionCom?: string;
  imagen_url?: string;
}


export const ProductService = {
  async getAll(): Promise<ProductoInterface[]> {
    try {
      console.log("🔍 Intentando obtener productos desde:", `${API_URL}/obtenerProductos`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout
      
      const res = await fetch(`${API_URL}/obtenerProductos`, {
        headers: {
          "Accept": "application/json",
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log("📡 Respuesta del servidor:", {
        status: res.status,
        statusText: res.statusText,
        ok: res.ok,
        url: res.url
      });
      
      if (!res.ok) {
        let errorMessage = `Error ${res.status}: ${res.statusText}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          console.error("❌ Error del servidor:", errorData);
        } catch (parseError) {
          console.error("❌ Error parseando respuesta de error:", parseError);
        }
        throw new Error(errorMessage);
      }
      
      const data = await res.json();
      console.log("✅ Productos obtenidos:", data.length, "productos");
      return data;
    } catch (error) {
      console.error("❌ Error en ProductService.getAll:", error);
      
      
      throw error;
    }
  },

  async getById(id: number): Promise<ProductoInterface> {
    const res = await fetch(`${API_URL}/obtenerProducto/${id}`, {
      headers: {
        "Accept": "application/json",
      },
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al obtener producto");
    }
    return res.json();
  },

  async create(producto: ProductoInterface): Promise<void> {
    const res = await fetch(`${API_URL}/crearProducto`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(producto),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al crear producto");
    }
  },

  async update(id: number, producto: ProductoInterface): Promise<void> {
    const res = await fetch(`${API_URL}/actualizarProducto/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(producto),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al actualizar producto");
    }
  },

  async changeState(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/cambiarEstadoProducto/${id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json"
      }
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al cambiar estado del producto");
    }
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/eliminarProducto/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json"
      }
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al eliminar producto");
    }
  },
};
