import { useState, useEffect } from "react";
import { Product as CartProduct } from "../atoms/ProductTypes";
import { productService   } from "../../services/productService";
import { ProductoInterface as ApiProduct } from "@/interfaces/product.interface";

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
          price: Number(apiProduct.precio),
          image: apiProduct.imagen_url || "/placeholder.jpg",
          description: apiProduct.descripcion,
          category: apiProduct.material || "General",
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
