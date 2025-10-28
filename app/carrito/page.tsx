'use client';

import React from 'react';
import HomeLayout from '../../components/layouts/HomeLayout';
import { useCartStore } from '../../components/organisms/CartStore';
import { useRouter } from 'next/navigation';

export default function CarritoPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();
  const router = useRouter();

  const handleContinuar = () => {
    if (items.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de continuar.");
      return;
    }
    router.push('/confirmarp'); 
  };

  return (
    <HomeLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">

              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">Cesta</h1>
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    🗑 Limpiar carrito
                  </button>
                )}
              </div>

              <div className="p-6">
                {items.length === 0 ? (
                  <div className="text-center py-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
                    <p className="text-gray-600 mb-8">Añade algunos productos para comenzar tu compra</p>
                    <div className="space-y-4 max-w-sm mx-auto">
                      <button
                        onClick={() => router.push('/login')}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors"
                      >
                        Identifícate
                      </button>
                      <button
                        onClick={() => router.push('/')}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors"
                      >
                        Explora artículos
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-red-600">${item.product.price}</span>
                            <div className="flex items-center gap-3">
                              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">-</button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">+</button>
                              <button onClick={() => removeItem(item.product.id)} className="text-red-500 hover:text-red-700">🗑</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-8 p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Resumen</h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Estimación total</span>
                <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleContinuar}
                className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                Continuar ({totalItems})
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  🗑 Limpiar carrito
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
