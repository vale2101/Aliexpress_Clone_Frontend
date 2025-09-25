'use client';

import React from 'react';
import HomeLayout from '../../components/layouts/HomeLayout';
import ProductItem from '../../components/molecules/ProductItem';
import { useProducts } from '../../hooks/useProducts';

export default function TestCarritoPage() {
  const { products, loading, error } = useProducts();

  return (
    <HomeLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Prueba del Carrito - Añade productos para ver el contador
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-gray-600">Cargando productos...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-2">Error al cargar productos</p>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                showQuantityControls={true}
                className="hover:shadow-lg transition-shadow"
              />
            ))}
          </div>
        )}
        
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            📝 Instrucciones para probar:
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Haz clic en "Añadir al carrito" en cualquier producto</li>
            <li>Observa cómo el contador en el header (icono de carrito) se actualiza</li>
            <li>Ve a <a href="/carrito" className="text-blue-600 underline">/carrito</a> para ver los productos añadidos</li>
            <li>Modifica cantidades o elimina productos</li>
            <li>El contador se actualizará en tiempo real</li>
          </ol>
        </div>
      </div>
    </HomeLayout>
  );
}
