import { useState, useMemo } from "react";
import { ProductoInterface } from "../interfaces/product.interface";
import { productService } from "../services/productService";

interface UseSearchProps {
  products?: ProductoInterface[];
  autoLoad?: boolean;
  initialQuery?: string;
}

export const useSearch = ({ products, autoLoad = true, initialQuery = "" }: UseSearchProps = {}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [allProducts, setAllProducts] = useState<ProductoInterface[]>(products || []);
  const [loading, setLoading] = useState(autoLoad);

  // Cargar productos si autoLoad está activado y no se proporcionaron productos
  const loadProducts = async () => {
    if (products) return; // Ya tenemos productos
    
    try {
      setLoading(true);
      const data = await productService.getAll();
      setAllProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar productos basándose en la query de búsqueda
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return allProducts;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return allProducts.filter((producto) => {
      const nombreMatch = producto.nombre.toLowerCase().includes(query);
      const descripcionMatch = producto.descripcion?.toLowerCase().includes(query) || false;
      const categoriaMatch = producto.categoria?.toLowerCase().includes(query) || false;
      const materialMatch = producto.material?.toLowerCase().includes(query) || false;

      return nombreMatch || descripcionMatch || categoriaMatch || materialMatch;
    });
  }, [allProducts, searchQuery]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    return {
      total: allProducts.length,
      filtered: filteredProducts.length,
      searchTerm: searchQuery,
    };
  }, [allProducts.length, filteredProducts.length, searchQuery]);

  // Limpiar búsqueda
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Actualizar productos externamente
  const updateProducts = (newProducts: ProductoInterface[]) => {
    setAllProducts(newProducts);
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    allProducts,
    loading,
    stats,
    clearSearch,
    loadProducts,
    updateProducts,
  };
};

