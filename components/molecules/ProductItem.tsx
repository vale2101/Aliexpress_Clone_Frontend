import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../organisms/CartStore';
import { Product } from '../atoms/ProductTypes';
import Button from '../atoms/Button';
import Price from '../atoms/Price';
import Rating from '../atoms/Rating';

interface ProductItemProps {
  product: Product;
  showQuantityControls?: boolean;
  className?: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ 
  product, 
  showQuantityControls = false,
  className = ""
}) => {
  const { addItem, removeItem, updateQuantity, getItemQuantity } = useCartStore();
  const currentQuantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, currentQuantity + 1);
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex gap-4">
        {/* Imagen del producto */}
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>

        {/* Información del producto */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-1">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {product.description}
            </p>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-2">
              <Rating rating={product.rating} />
              {product.reviews && (
                <span className="text-sm text-gray-500">
                  ({product.reviews} reseñas)
                </span>
              )}
            </div>
          )}

          {/* Precio */}
          <div className="mb-3">
            <Price 
              price={product.price} 
              currency="$" 
              size="lg"
            />
          </div>

          {/* Controles de cantidad y acciones */}
          <div className="flex items-center justify-between">
            {showQuantityControls && currentQuantity > 0 ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="w-8 text-center font-medium">
                  {currentQuantity}
                </span>
                
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Añadir al carrito
                </Button>
              </div>
            )}

            {/* Botón de eliminar si está en el carrito */}
            {currentQuantity > 0 && (
              <button
                onClick={handleRemove}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
