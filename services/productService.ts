import { API_CONFIG, buildApiUrl, DEFAULT_FETCH_OPTIONS } from "../config/api";
import { Product, ApiResponse, ServiceResponse, SearchParams } from "../config/types";

export class ProductService {
  private readonly baseUrl = API_CONFIG.BASE_URL;

  /**
   * Realiza una petición HTTP con manejo de errores centralizado
   * @param url - URL completa del endpoint
   * @param options - Opciones de fetch
   * @returns Promise con la respuesta parseada
   */
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const response = await fetch(url, {
        ...DEFAULT_FETCH_OPTIONS,
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.warn('No se pudo parsear el error:', parseError);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('La petición tardó demasiado tiempo');
        }
        if (error.message.includes('fetch')) {
          throw new Error(
            'No se puede conectar con el servidor. Verifica que el backend esté corriendo.'
          );
        }
      }
      throw error;
    }
  }

  /**
   * Obtiene todos los productos
   * @param params - Parámetros de búsqueda opcionales
   * @returns Lista de productos
   */
  async getAll(params?: SearchParams): Promise<Product[]> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.GET_ALL);
      console.log("🔎 Fetching productos desde:", url);

      const response = await this.makeRequest<ApiResponse<Product[]>>(url, {
        cache: "no-store",
      });

      console.log("✅ Respuesta productos:", response);
      return response.data || [];
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
      throw error;
    }
  }

  /**
   * Obtiene un producto por su ID
   * @param id - ID del producto
   * @returns Datos del producto
   */
  async getById(id: number): Promise<Product> {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.PRODUCTS.GET_BY_ID}/${id}`);
      console.log("🔎 Fetching producto con ID:", id);

      const response = await this.makeRequest<ApiResponse<Product>>(url);
      console.log("✅ Respuesta producto:", response);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener producto:", error);
      throw error;
    }
  }

  /**
   * Busca productos por término de búsqueda
   * @param query - Término de búsqueda
   * @param params - Parámetros adicionales de búsqueda
   * @returns Lista de productos que coinciden
   */
  async search(query: string, params?: Omit<SearchParams, 'query'>): Promise<Product[]> {
    try {
      const searchParams = new URLSearchParams({
        q: query,
        ...(params?.page && { page: params.page.toString() }),
        ...(params?.limit && { limit: params.limit.toString() }),
        ...(params?.category && { category: params.category }),
        ...(params?.minPrice && { minPrice: params.minPrice.toString() }),
        ...(params?.maxPrice && { maxPrice: params.maxPrice.toString() }),
      });

      const url = `${buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS.GET_ALL)}?${searchParams}`;
      console.log("🔍 Buscando productos:", url);

      const response = await this.makeRequest<ApiResponse<Product[]>>(url);
      return response.data || [];
    } catch (error) {
      console.error("❌ Error al buscar productos:", error);
      throw error;
    }
  }
}

export const productService = new ProductService();

export type { Product };
