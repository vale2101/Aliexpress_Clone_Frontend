import React from "react";
import ProductCard from "../atoms/ProductCard";

export default function RecommendationsSection() {
  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop&crop=center",
      title: "Promo Funda giratoria de 360 grados para tablet",
      price: "$13.589,44",
      oldPrice: "$17.697,08",
      discount: "-77%",
      rating: 4.5,
      sold: "3 vendidos",
      label: "Promo",
      savings: "Ahorra $7.644,78"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
      title: "Choice Juego de manicura completo con herramientas",
      price: "$4.029,23",
      oldPrice: "$17.697,08",
      discount: "-77%",
      rating: 4.5,
      sold: "2.000+ vendidos",
      label: "Choice",
      features: ["Nuevo comprador", "-$8.300 en $8.400"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center",
      title: "Choice Promo VIVIBEE Gafas de sol redondas",
      price: "$4.029,23",
      oldPrice: "$20.146,15",
      discount: "-80%",
      rating: 4.8,
      sold: "1.000+ vendidos",
      label: "Choice Promo",
      features: ["Nuevo comprador"]
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center",
      title: "Promo Pájaro con sombrero de paja trenzado",
      price: "$4.029,23",
      rating: 4.6,
      sold: "1 vendidos",
      label: "Promo",
      savings: "Ahorra $8.343,36"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center",
      title: "Promo Gafas de lectura transparentes 4 pares",
      price: "$4.029,23",
      rating: 4.6,
      sold: "48 vendidos",
      label: "Promo",
      savings: "Ahorra $35.896,78"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop&crop=center",
      title: "Choice Promo Wosheer FLUFFY 1000 pestañas postizas",
      price: "$4.029,23",
      rating: 4.5,
      sold: "1.000+ vendidos",
      label: "Choice Promo",
      savings: "Ahorra $1.244,92"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop&crop=center",
      title: "Choice Promo Funda para tablet azul oscuro",
      price: "$4.029,23",
      oldPrice: "$12.997,16",
      discount: "-69%",
      rating: 4.7,
      sold: "500+ vendidos",
      label: "Choice Promo"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
      title: "Promo Caja sorpresa dedo medio regalo",
      price: "$4.029,23",
      rating: 4.3,
      sold: "25 vendidos",
      label: "Promo"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center",
      title: "Choice SuperOfertas Camiseta DEXTER negra",
      price: "$4.029,23",
      oldPrice: "$6.500,00",
      discount: "-38%",
      rating: 4.4,
      sold: "150+ vendidos",
      label: "Choice SuperOfertas"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center",
      title: "Promo Suavizante de telas Downy púrpura",
      price: "$4.029,23",
      oldPrice: "$5.100,00",
      discount: "-21%",
      rating: 4.2,
      sold: "75 vendidos",
      label: "Promo"
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center",
      title: "Choice Promo Stitch Disney Princess bloques",
      price: "$4.029,23",
      rating: 4.8,
      sold: "300+ vendidos",
      label: "Choice Promo"
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop&crop=center",
      title: "Choice Promo Funda iPhone transparente rosa",
      price: "$4.029,23",
      oldPrice: "$13.900,00",
      discount: "-71%",
      rating: 4.6,
      sold: "800+ vendidos",
      label: "Choice Promo"
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-full mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Seguro que te gusta</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
              savings={product.savings}
              features={product.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
