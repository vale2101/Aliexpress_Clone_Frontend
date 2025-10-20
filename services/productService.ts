import { ENV } from "../config/env";

const API_URL = `${ENV.API_URL}/producto`;

export interface ProductoInterface {
  id_producto?: number;
  nombre: string;
  descripcion?: string;
  precio: number | string;
  precio_original?: number | string;
  descuento?: number | string;
  moneda?: string;
  stock: number;
  estado?: "activo" | "inactivo";
  fecha_publicacion?: string;
  material?: string;
  color?: string;
  peso?: number | string;
  dimensiones?: string;
  descripcionCom?: string;
  imagen_url?: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

export const ProductService = {
  async getAll(): Promise<ProductoInterface[]> {
    const res = await fetch(`${API_URL}/obtenerProductos`);
    if (!res.ok) throw new Error("Error al obtener productos");

    const json: ApiResponse<ProductoInterface[]> = await res.json();

    if (!Array.isArray(json.data)) {
      throw new Error("La respuesta del servidor no contiene una lista válida de productos");
    }

    return json.data;
  },

  async getById(id: number): Promise<ProductoInterface> {
    const res = await fetch(`${API_URL}/obtenerProducto/${id}`);
    if (!res.ok) throw new Error("Error al obtener el producto");

    const json: ApiResponse<ProductoInterface> = await res.json();
    return json.data;
  },

  async create(producto: ProductoInterface): Promise<ProductoInterface> {
    const res = await fetch(`${API_URL}/crearProducto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!res.ok) throw new Error("Error al crear el producto");

    const json: ApiResponse<ProductoInterface> = await res.json();
    return json.data;
  },

  async update(id: number, producto: ProductoInterface): Promise<ProductoInterface> {
    const res = await fetch(`${API_URL}/actualizarProducto/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!res.ok) throw new Error("Error al actualizar el producto");

    const json: ApiResponse<ProductoInterface> = await res.json();
    return json.data;
  },

  async changeState(id: number): Promise<string> {
    const res = await fetch(`${API_URL}/cambiarEstadoProducto/${id}`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Error al cambiar estado del producto");

    const json: ApiResponse<null> = await res.json();
    return json.message || "Estado cambiado correctamente";
  },

  async delete(id: number): Promise<string> {
    const res = await fetch(`${API_URL}/eliminarProducto/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar el producto");

    const json: ApiResponse<null> = await res.json();
    return json.message || "Producto eliminado correctamente";
  },
};
