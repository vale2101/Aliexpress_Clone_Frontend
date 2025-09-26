import React from "react";
import Image from "next/image";

type CardProps = { title: string; price: string; img: string; store?: string };
const Item = ({ title, price, img, store }: CardProps) => (
  <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="aspect-square overflow-hidden bg-gray-100">
      <Image 
        src={img} 
        alt={title} 
        width={300}
        height={300}
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
      />
    </div>
    <div className="p-3">
      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{title}</h3>
      {store && <p className="text-xs text-gray-500 mb-2">{store}</p>}
      <p className="text-lg font-bold text-red-600">{price}</p>
    </div>
  </div>
);

const OffersCarousel = () => {
  const items: CardProps[] = [
    { title:"Auriculares Bluetooth Pro HIFI", price:"$19.990", img:"https://picsum.photos/seed/1/600/600", store:"Tech Store" },
    { title:"Smartwatch Fitness Plus",        price:"$24.500", img:"https://picsum.photos/seed/2/600/600", store:"Fit Deals" },
    { title:"Mini cámara Wi-Fi 1080p",        price:"$15.200", img:"https://picsum.photos/seed/3/600/600", store:"Cam World" },
    { title:"Teclado mecánico 60% RGB",       price:"$39.990", img:"https://picsum.photos/seed/4/600/600", store:"KeyLab" },
    { title:"Báscula smart",                  price:"$12.990", img:"https://picsum.photos/seed/5/600/600" },
    { title:"Gafas IA Xiaomi",                price:"$299.000", img:"https://picsum.photos/seed/6/600/600" },
  ];
  return (
    <section className="bg-white py-8">
      <div className="max-w-full mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Ofertas de hoy</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((it, i) => <Item key={i} {...it} />)}
        </div>
      </div>
    </section>
  );
};

export default OffersCarousel;
