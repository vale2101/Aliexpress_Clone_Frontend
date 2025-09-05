import React from "react";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  sold?: string;
  store?: string;
  label?: string;
  savings?: string;
  features?: string[];
  button?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  oldPrice,
  discount,
  rating,
  sold,
  store,
  label,
  savings,
  features,
  button,
}) => {
  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Botones de acción */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col gap-1">
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
              <ShoppingCart className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Badge de descuento */}
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {discount}
          </div>
        )}

        {/* Label del producto */}
        {label && (
          <div className="absolute bottom-2 left-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {label}
          </div>
        )}
      </div>

      {/* Contenido del producto */}
      <div className="p-3">
        {/* Título del producto */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
          {title}
        </h3>

        {/* Tienda */}
        {store && (
          <p className="text-xs text-gray-500 mb-1">{store}</p>
        )}

        {/* Características */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {features.map((feature, index) => (
              <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Precios */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-red-600">{price}</span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">{oldPrice}</span>
            )}
          </div>

          {/* Ahorro */}
          {savings && (
            <p className="text-xs text-green-600 font-medium">{savings}</p>
          )}
        </div>

        {/* Rating y ventas */}
        {rating && (
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xs ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-600">{rating}</span>
            </div>
            {sold && (
              <span className="text-xs text-gray-500">{sold} vendidos</span>
            )}
          </div>
        )}

        {/* Botón especial */}
        {button && (
          <button className="w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded mt-2 transition-colors">
            {button}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
