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
  imagen_url?: string; // 👈 agregado
}

export class ProductService {
  private baseUrl = `${API_CONFIG.BASE_URL}/producto`;

  async getAll(): Promise<Product[]> {
    console.log("🔎 Fetching productos desde:", `${this.baseUrl}/obtenerProductos`);

    const res = await fetch(`${this.baseUrl}/obtenerProductos`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error en fetch productos:", res.status, errorText);
      throw new Error(`Error al obtener productos: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Respuesta productos:", data);

    // tu API devuelve { data: [...] }
    return data.data;
  }

  async getById(id: number): Promise<Product> {
    console.log("🔎 Fetching producto con ID:", id);

    const res = await fetch(`${this.baseUrl}/obtenerProducto/${id}`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error en fetch producto:", res.status, errorText);
      throw new Error(`Error al obtener producto: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Respuesta producto:", data);

    return data.data;
  }
}

export const productService = new ProductService();
