import React from "react";
import PromoCard from "../molecules/PromoCard";
import CountdownTimer from "../molecules/CountdownTimer";

const HeroBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#ff7a1a]">
      <div className="container-xl flex items-center justify-between gap-6 py-6">
        {/* Texto y cupones */}
        <div className="flex-1 text-white">
          <p className="mb-1 text-xs font-semibold">
            La Promo Termina: 6 sept., 01:59 (GMT-5)
          </p>
          <h2 className="text-3xl font-extrabold">
            Hasta <span className="text-yellow-300">-60%</span> dto.
          </h2>

          {/* Cupones */}
          <div className="mt-4 flex flex-wrap gap-3">
            <PromoCard discount="-$8.300" code="CO0002" />
            <PromoCard discount="-$22.000" code="CO0005" />
            <PromoCard discount="-$42.000" code="CO0010" />
          </div>

          {/* Timer */}
          <div className="mt-3 inline-flex items-center gap-2 rounded bg-white/20 px-3 py-1 text-sm font-medium">
            Termina en <CountdownTimer />
          </div>
        </div>

        {/* Imagen lateral */}
        <div className="hidden md:block w-[320px]">
          <img
            src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80&auto=format&fit=crop"
            alt="Promo"
            className="h-[200px] w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
