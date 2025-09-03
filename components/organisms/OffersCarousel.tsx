import React from "react";

const OffersCarousel = () => {
  return (
    <section className="p-6">
      <h2 className="text-xl font-bold mb-4">Ofertas de hoy</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border p-4 rounded shadow text-center">Oferta 1</div>
        <div className="border p-4 rounded shadow text-center">Oferta 2</div>
        <div className="border p-4 rounded shadow text-center">Oferta 3</div>
        <div className="border p-4 rounded shadow text-center">Oferta 4</div>
      </div>
    </section>
  );
};

export default OffersCarousel;
