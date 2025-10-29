"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, Share2, MessageCircle } from "lucide-react";
import Button from "../atoms/Button";
import QuantitySelector from "../atoms/QuantitySelector";
import SizeSelector from "../atoms/SizeSelector";

interface ProductActionsProps {
  productId: number;
  availableSizes?: string[];
  onAddToCart: (productId: number, quantity: number, size?: string) => void;
  onAddToWishlist: (productId: number) => void;
  onShare: (productId: number) => void;
  onContact: (productId: number) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  availableSizes = [],
  onAddToCart,
  onAddToWishlist,
  onShare,
  onContact,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    availableSizes.length > 0 ? availableSizes[0] : undefined
  );

  const handleAddToCart = () => {
    onAddToCart(productId, quantity, selectedSize);
  };

  const handleAddToWishlist = () => {
    onAddToWishlist(productId);
  };

  const handleShare = () => {
    onShare(productId);
  };

  const handleContact = () => {
    onContact(productId);
  };

  return (
    <div className="space-y-6">
      {availableSizes.length > 0 && (
        <SizeSelector
          sizes={availableSizes}
          selectedSize={selectedSize}
          onSizeSelect={setSelectedSize}
        />
      )}

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Cantidad:</h4>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={99}
        />
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Añadir al carrito
        </Button>

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={handleAddToWishlist}
            variant="ghost"
            className="flex items-center justify-center py-2 border border-gray-300 hover:bg-gray-50"
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleShare}
            variant="ghost"
            className="flex items-center justify-center py-2 border border-gray-300 hover:bg-gray-50"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleContact}
            variant="ghost"
            className="flex items-center justify-center py-2 border border-gray-300 hover:bg-gray-50"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>✓ Envío gratis en pedidos superiores a $25</p>
        <p>✓ Devolución gratuita en 30 días</p>
        <p>✓ Garantía del vendedor</p>
      </div>
    </div>
  );
};

export default ProductActions;
