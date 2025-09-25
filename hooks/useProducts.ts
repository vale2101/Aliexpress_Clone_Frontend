import { useState, useEffect } from 'react';
import { Product as CartProduct } from '../stores/cartStore';
import { productService, Product as ApiProduct } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener productos usando el servicio existente
        const apiProducts: ApiProduct[] = await productService.getAll();
        
        // Convertir productos de la API al formato del store
        const convertedProducts: CartProduct[] = apiProducts.map(apiProduct => ({
          id: apiProduct.id_producto?.toString() || '0',
          name: apiProduct.nombre,
          price: apiProduct.precio,
          image: apiProduct.imagen_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
          description: apiProduct.descripcion,
          category: apiProduct.material || 'General',
          rating: 4.5, // Valor por defecto ya que no está en la API
          reviews: Math.floor(Math.random() * 1000) + 100 // Valor aleatorio para demostración
        }));
        
        setProducts(convertedProducts);
      } catch (err) {
        console.warn('No se pudieron obtener productos de la API, usando datos de ejemplo:', err);
        
        // Si falla la API, usar productos de ejemplo
        const sampleProducts: CartProduct[] = [
          {
            id: '1',
            name: 'iPhone 15 Pro Max 256GB',
            price: 1199.99,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
            description: 'El iPhone más avanzado con cámara de 48MP y chip A17 Pro',
            category: 'Electrónicos',
            rating: 4.8,
            reviews: 1250
          },
          {
            id: '2',
            name: 'Samsung Galaxy S24 Ultra',
            price: 1099.99,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
            description: 'Smartphone premium con S Pen y cámara de 200MP',
            category: 'Electrónicos',
            rating: 4.7,
            reviews: 890
          },
          {
            id: '3',
            name: 'MacBook Pro 14" M3',
            price: 1999.99,
            image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
            description: 'Laptop profesional con chip M3 y pantalla Liquid Retina XDR',
            category: 'Computadoras',
            rating: 4.9,
            reviews: 567
          },
          {
            id: '4',
            name: 'AirPods Pro 2da Gen',
            price: 249.99,
            image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
            description: 'Auriculares inalámbricos con cancelación activa de ruido',
            category: 'Audio',
            rating: 4.6,
            reviews: 2340
          },
          {
            id: '5',
            name: 'iPad Air 11" M2',
            price: 599.99,
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
            description: 'Tablet versátil con chip M2 y pantalla Liquid Retina',
            category: 'Tablets',
            rating: 4.8,
            reviews: 1234
          },
          {
            id: '6',
            name: 'Apple Watch Series 9',
            price: 399.99,
            image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
            description: 'Reloj inteligente con GPS y monitoreo de salud avanzado',
            category: 'Wearables',
            rating: 4.7,
            reviews: 1890
          }
        ];
        
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
