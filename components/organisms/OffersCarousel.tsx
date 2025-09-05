import React from "react";

type CardProps = { title: string; price: string; img: string; store?: string };
const Item = ({ title, price, img, store }: CardProps) => (
  <div className="rounded-xl border bg-white p-3 shadow-soft transition hover:-translate-y-0.5">
    <div className="aspect-square overflow-hidden rounded-lg bg-neutral-50">
      <img src={img} alt={title} className="h-full w-full object-cover" />
    </div>
    <div className="mt-2">
      <p className="line-clamp-2 text-[13px] text-neutral-800">{title}</p>
      {store && <p className="text-[12px] text-neutral-500">{store}</p>}
      <p className="mt-1 text-lg font-bold">{price}</p>
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
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-4 text-xl font-bold">Ofertas de hoy</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((it, i) => <Item key={i} {...it} />)}
      </div>
    </section>
  );
};

export default OffersCarousel;
