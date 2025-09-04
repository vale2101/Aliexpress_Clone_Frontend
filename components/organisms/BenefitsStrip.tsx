import React from "react";

export default function BenefitsStrip() {
  return (
    <div className="w-full border-y bg-white">
      <div className="container-xl flex h-12 items-center justify-between text-sm">
        <span className="flex items-center gap-2">
          🚚 Envío gratis <span className="text-neutral-500">En muchos artículos Choice</span>
        </span>
        <span className="flex items-center gap-2">
          ⚡ Entrega rápida <span className="text-neutral-500">Reembolso por fallo de entrega</span>
        </span>
        <span className="flex items-center gap-2">✅ Compras protegidas</span>
      </div>
    </div>
  );
}
