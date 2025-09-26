import { useState, useEffect } from "react";
import { Product as CartProduct } from "../stores/cartStore";
import { productService, Product as ApiProduct } from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiProducts: ApiProduct[] = await productService.getAll();

        const convertedProducts: CartProduct[] = apiProducts.map((apiProduct) => ({
          id: apiProduct.id_producto?.toString() || "0",
          name: apiProduct.nombre,
          price: apiProduct.precio,
          image:
            apiProduct.imagen_url ||
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
          description: apiProduct.descripcion,
          category: apiProduct.material || "General",
          rating: 4.5,
          reviews: Math.floor(Math.random() * 1000) + 100,
        }));

        setProducts(convertedProducts);
      } catch (err) {
        console.error(" Error al obtener productos de la API:", err);
        setError("No se pudieron cargar los productos. Intenta de nuevo más tarde.");
        setProducts([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
