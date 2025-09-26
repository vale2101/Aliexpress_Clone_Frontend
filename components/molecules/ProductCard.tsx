import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../organisms/CartStore";
import { Product } from "../atoms/ProductTypes";
import ActionButton from "../atoms/ActionButton";
import DiscountBadge from "../atoms/DiscountBadge";
import ProductLabel from "../atoms/ProductLabel";
import Price from "../atoms/Price";
import Rating from "../atoms/Rating";

interface ProductCardProps {
  id?: number;
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
  id,
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
  const router = useRouter();
  const { addItem } = useCartStore();

  const handleCardClick = () => {
    if (id) {
      router.push(`/producto/${id}`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se active el click del card
    if (id) {
      const product: Product = {
        id: id.toString(),
        name: title,
        price: parseFloat(price.replace(/[^0-9.-]+/g, "")),
        image: image,
        description: features?.join(", "),
        rating: rating,
        reviews: sold ? parseInt(sold.replace(/[^0-9]/g, "")) : undefined
      };
      addItem(product, 1);
    }
  };
  return (
    <div 
      className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
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
            <ActionButton icon={Heart} />
            <ActionButton icon={ShoppingCart} onClick={handleAddToCart} />
          </div>
        </div>

        {/* Badge de descuento */}
        {discount && (
          <DiscountBadge discount={discount} />
        )}

        {/* Label del producto */}
        {label && (
          <ProductLabel label={label} />
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
          <Price 
            price={parseFloat(price.replace(/[^0-9.-]+/g, ""))} 
            originalPrice={oldPrice ? parseFloat(oldPrice.replace(/[^0-9.-]+/g, "")) : undefined}
            currency="$"
            size="sm"
          />

          {/* Ahorro */}
          {savings && (
            <p className="text-xs text-green-600 font-medium">{savings}</p>
          )}
        </div>

        {/* Rating y ventas */}
        {rating && (
          <div className="flex items-center justify-between mt-2">
            <Rating rating={rating} />
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
