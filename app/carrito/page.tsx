'use client';

import React from 'react';
import HomeLayout from '../../components/layouts/HomeLayout';
import { useCartStore } from '../../components/organisms/CartStore';

export default function CarritoPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();

  return (
    <HomeLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Carrito Principal - Estilo AliExpress */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Header del carrito */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-gray-900">Cesta</h1>
                  {items.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Limpiar carrito
                    </button>
                  )}
                </div>
              </div>

              {/* Contenido del carrito */}
              <div className="p-6">
                {items.length === 0 ? (
                  <div className="text-center py-16">
                    {/* Ilustración de carrito vacío mejorada */}
                    <div className="mb-8">
                      <div className="relative mx-auto w-64 h-40">
                        {/* Cara triste */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                            <div className="text-4xl">😟</div>
                          </div>
                        </div>
                        
                        {/* Carrito de compras */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                          <div className="w-20 h-16 bg-red-500 rounded-lg relative shadow-lg">
                            {/* Cuerpo del carrito */}
                            <div className="absolute top-2 left-2 w-14 h-10 bg-red-400 rounded"></div>
                            {/* Ruedas */}
                            <div className="absolute -bottom-1 left-3 w-3 h-3 bg-red-700 rounded-full"></div>
                            <div className="absolute -bottom-1 right-3 w-3 h-3 bg-red-700 rounded-full"></div>
                            {/* Badge con 0 */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center text-sm font-bold text-red-600 shadow-md">
                              0
                            </div>
                            {/* Asa del carrito */}
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-red-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
                    <p className="text-gray-600 mb-8">Añade algunos productos para comenzar tu compra</p>
                    
                    <div className="space-y-4 max-w-sm mx-auto">
                      <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
                        Identifícate
                      </button>
                      <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
                        Explora artículos
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{item.product.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.product.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-red-600">${item.product.price}</span>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              <button 
                                onClick={() => removeItem(item.product.id)}
                                className="text-red-500 hover:text-red-700 p-2 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
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

          {/* Resumen del carrito - Estilo AliExpress */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-8">
              {/* Header del resumen */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Resumen</h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Estimación total */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Estimación total</span>
                  <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Botón continuar */}
                <button className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  Continuar ({totalItems})
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>

                {/* Botón limpiar carrito */}
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Limpiar carrito
                  </button>
                )}

                {/* Entrega rápida */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="font-medium text-gray-900">Entrega rápida</span>
                    <span className="text-gray-400">&gt;</span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Cupón de $1.00 por entrega tardía
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Reembolso por pérdida del paquete
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Reembolso por artículos dañados
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Reembolso si no llega en 60 días
                    </li>
                  </ul>
                </div>

                {/* Seguridad & Privacidad */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium text-gray-900">Seguridad & Privacidad</span>
                    <span className="text-gray-400">&gt;</span>
                  </div>
                  <p className="text-sm text-gray-600">Pagos seguros</p>
                  <p className="text-sm text-gray-600">Datos personales seguros</p>
                </div>

                {/* Pagos seguros */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-medium text-gray-900">Pagos seguros</span>
                  </div>
                  
                  {/* Logos de tarjetas */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
                    <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">M</div>
                    <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">A</div>
                    <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">J</div>
                  </div>
                  
                  <p className="text-xs text-gray-600">
                    Con socios de pago populares tus datos personales están seguros
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
