import React from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../organisms/CartStore";
import { Product } from "../atoms/ProductTypes";
import ProductCardImage from "./ProductCardImage";
import ProductCardActions from "./ProductCardActions";
import ProductCardInfo from "./ProductCardInfo";
import ProductCardPrice from "./ProductCardPrice";
import ProductCardMeta from "./ProductCardMeta";
import ProductCardCTA from "./ProductCardCTA";

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
    if (id) router.push(`/producto/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
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
      <div className="relative aspect-square overflow-hidden">
        <ProductCardImage src={image} alt={title} discount={discount} label={label} />
        <ProductCardActions onAddToCart={handleAddToCart} />
      </div>

      <div className="p-3">
        <ProductCardInfo title={title} store={store} features={features} />

        <ProductCardPrice 
          price={parseFloat(price.replace(/[^0-9.-]+/g, ""))}
          originalPrice={oldPrice ? parseFloat(oldPrice.replace(/[^0-9.-]+/g, "")) : undefined}
          currency="$"
          savings={savings}
        />

        <ProductCardMeta rating={rating} sold={sold} />

        <ProductCardCTA label={button} />
      </div>
    </div>
  );
};

export default ProductCard;
