import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import Button from '../atoms/Button';
import Price from '../atoms/Price';

interface CartProps {
  className?: string;
  showHeader?: boolean;
  showCheckout?: boolean;
}

const Cart: React.FC<CartProps> = ({ 
  className = "",
  showHeader = true,
  showCheckout = true
}) => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();

  const handleIncrement = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeItem(productId);
    }
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
  };

  const handleCheckout = () => {
    // Aquí puedes implementar la lógica de checkout
    console.log('Proceder al checkout', { items, totalPrice });
  };

  if (items.length === 0) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-8 text-center ${className}`}>
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Tu carrito está vacío
        </h3>
        <p className="text-gray-500">
          Añade algunos productos para comenzar tu compra
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header del carrito */}
      {showHeader && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Carrito de compras
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
              </span>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de productos */}
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.product.id} className="p-6">
            <div className="flex gap-4">
              {/* Imagen del producto */}
              <div className="flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>

              {/* Información del producto */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-1">
                  {item.product.name}
                </h3>
                
                {item.product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {item.product.description}
                  </p>
                )}

                {/* Precio unitario */}
                <div className="mb-3">
                  <Price 
                    price={item.product.price} 
                    currency="€" 
                    size="sm"
                  />
                </div>

                {/* Controles de cantidad y subtotal */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrement(item.product.id, item.quantity)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleIncrement(item.product.id, item.quantity)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Subtotal</div>
                    <Price 
                      price={item.subtotal} 
                      currency="€" 
                      size="md"
                    />
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen del carrito */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-3">
          {/* Total de artículos */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total de artículos:</span>
            <span className="font-medium">{totalItems}</span>
          </div>

          {/* Total general */}
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-gray-900">Total:</span>
            <Price 
              price={totalPrice} 
              currency="€" 
              size="lg"
            />
          </div>

          {/* Botón de checkout */}
          {showCheckout && (
            <Button
              onClick={handleCheckout}
              className="w-full mt-4 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Proceder al checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
