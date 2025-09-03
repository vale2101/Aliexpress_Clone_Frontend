import React from "react";

type PromoCardProps = {
  discount: string;
  code: string;
};

const PromoCard: React.FC<PromoCardProps> = ({ discount, code }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg text-center border w-40">
      <p className="text-red-500 font-bold text-lg">{discount}</p>
      <p className="text-sm">Código: {code}</p>
    </div>
  );
};

export default PromoCard;
