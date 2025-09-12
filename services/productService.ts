import { API_CONFIG } from "../config/api";

export interface Product {
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
}

export class ProductService {
  private baseUrl = `${API_CONFIG.BASE_URL}/producto`;

  async getAll(): Promise<Product[]> {
    const res = await fetch(`${this.baseUrl}/obtenerProductos`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error al obtener productos");
    const data = await res.json();
    return data.data;
  }

  async getById(id: number): Promise<Product> {
    const res = await fetch(`${this.baseUrl}/obtenerProducto/${id}`);
    if (!res.ok) throw new Error("Error al obtener el producto");
    const data = await res.json();
    return data.data;
  }
}

export const productService = new ProductService();
