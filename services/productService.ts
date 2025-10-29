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

  async getAllActive(): Promise<ProductoInterface[]> {
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
      const allProductos = Array.isArray(productos) ? productos : [];
      
      // Filter only active products for public sections
      return allProductos.filter(producto => producto.estado === "activo");
    } catch (error) {
      console.error("❌ Error en productService.getAllActive:", error);
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
      console.log("🔍 ===== PRODUCT SERVICE CREATE =====");
      console.log("🔍 productService.create - Datos recibidos:", producto);
      console.log("🔍 productService.create - id_usuario:", producto.id_usuario);
      console.log("🔍 productService.create - API_URL:", API_URL);
      
      const url = `${API_URL}/producto/crearProducto`;
      console.log("🔍 productService.create - URL completa:", url);
      
      // Limpiar el producto antes de enviarlo
      const cleanProducto = {
        nombre: producto.nombre,
        descripcion: producto.descripcion || "",
        precio: producto.precio,
        precio_original: producto.precio_original || null,
        descuento: producto.descuento || null,
        moneda: producto.moneda || "USD",
        stock: producto.stock,
        estado: producto.estado || "activo",
        material: producto.material || "",
        color: producto.color || "",
        peso: producto.peso || null,
        dimensiones: producto.dimensiones || "",
        descripcionCom: producto.descripcionCom || "",
        imagen_url: producto.imagen_url || "",
        categoria: producto.categoria || "",
        id_usuario: producto.id_usuario
      };
      
      const requestBody = JSON.stringify(cleanProducto);
      console.log("🔍 productService.create - Producto limpio:", cleanProducto);
      console.log("🔍 productService.create - Request body:", requestBody);
      
      // Intentar primero con un solo producto
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: requestBody,
      });
      
      // Si falla, intentar con un array
      if (!response.ok) {
        console.log("🔄 Primer intento falló, intentando con array...");
        const arrayBody = JSON.stringify([cleanProducto]);
        console.log("🔍 productService.create - Intentando con array:", arrayBody);
        
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: arrayBody,
        });
      }

      console.log("🔍 productService.create - Response status:", response.status);
      console.log("🔍 productService.create - Response ok:", response.ok);
      console.log("🔍 productService.create - Response headers:", Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ productService.create - Error response:", errorText);
        console.error("❌ productService.create - Status:", response.status);
        console.error("❌ productService.create - Status Text:", response.statusText);
        console.error("❌ productService.create - Headers:", Object.fromEntries(response.headers.entries()));
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const responseData = await parseApiResponse<null>(response);
      console.log("🔍 productService.create - Response data:", responseData);
      console.log("✅ productService.create - Producto creado exitosamente");
      return true;
    } catch (error) {
      console.error("❌ Error en productService.create:", error);
      console.error("❌ Error details:", {
        message: error instanceof Error ? error.message : "Error desconocido",
        stack: error instanceof Error ? error.stack : undefined
      });
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

  async changeState(id: number, estado: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/producto/cambiarEstadoProducto/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Accept: "application/json" 
        },
        body: JSON.stringify({ estado }),
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