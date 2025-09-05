import React from "react";
import ProductCard from "../atoms/ProductCard";

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
      title: "Collar de oro con perlas y cuentas de colores",
      price: "$12.488,37",
      oldPrice: "$29.734,75",
      discount: "-58%",
      rating: 4.5,
      sold: "1.000+ vendidos",
      label: "Artículos similares"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
      title: "Anillos de plata con diseños florales",
      price: "$14.758,97",
      oldPrice: "$35.143,14",
      discount: "-58%",
      rating: 4.7,
      sold: "370 vendidos",
      label: "Visto antes"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
      title: "Pulseras de materiales orgánicos blancos",
      price: "$4.029,23",
      oldPrice: "$30.088,47",
      discount: "-87%",
      rating: 4.6,
      sold: "106 vendidos",
      label: "Visto antes"
    }
  ];

  return (
    <div className="bg-white py-8">
      <div className="max-w-full mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              discount={product.discount}
              rating={product.rating}
              sold={product.sold}
              label={product.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
