import React from "react";
import PromoCard from "../molecules/PromoCard";
import CountdownTimer from "../molecules/CountdownTimer";

const PromoBanner = () => {
  return (
    <div className="bg-orange-500 text-white py-6 px-4 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">La Promo Empieza en:</h2>
      <CountdownTimer />
      <div className="flex gap-4">
        <PromoCard discount="-COP230.000" code="CO055" />
        <PromoCard discount="-COP170.000" code="CO040" />
        <PromoCard discount="-COP130.000" code="CO030" />
      </div>
    </div>
  );
};

export default PromoBanner;
