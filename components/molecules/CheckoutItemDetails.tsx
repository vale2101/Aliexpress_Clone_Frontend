import React from "react";
import Text from "../atoms/Typography";
import Price from "../atoms/Price";
import QuantitySelector from "../atoms/QuantitySelector";
import LinkButton from "../atoms/LinkButton";

interface CheckoutItemDetailsProps {
  image: string;
  title: string;
  price: number;
  quantity: number;
  onQuantityChange?: (quantity: number) => void;
  onAddMoreItems?: () => void;
}

const CheckoutItemDetails: React.FC<CheckoutItemDetailsProps> = ({
  image,
  title,
  price,
  quantity,
  onQuantityChange,
  onAddMoreItems,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <Text variant="title" as="h2">
          Detalle del artículo
        </Text>
      </div>

      <div className="flex gap-4 items-start">
        <img
          src={image}
          alt={title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="flex-1">
          <Text variant="body" className="mb-2">
            {title}
          </Text>
          <div className="mb-2">
            <Price price={price} currency="$" size="sm" />
          </div>
          <QuantitySelector
            value={quantity}
            onChange={onQuantityChange || (() => {})}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <LinkButton onClick={onAddMoreItems}>Más artículos</LinkButton>
      </div>
    </div>
  );
};

export default CheckoutItemDetails;

