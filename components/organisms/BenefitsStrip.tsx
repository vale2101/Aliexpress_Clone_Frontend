"use client";

import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

import { Truck, Zap, ShieldCheck } from "lucide-react";

export default function BenefitsStrip() {
  const { t } = useLanguage();
  return (
    <div className="w-full border-y bg-white">
      <div className="container-xl flex flex-col sm:flex-row h-auto sm:h-12 items-center justify-between text-xs sm:text-sm py-2 sm:py-0 gap-2 sm:gap-0">
        
        {/* 🚚 Envío gratis */}
        <span className="flex items-center gap-1 sm:gap-2">
          <Truck size={16} /> 
          <span className="font-medium">{t("benefits.free_shipping")}</span>
          <span className="text-neutral-500 hidden sm:inline">
            {t("benefits.free_shipping_subtitle")}
          </span>
        </span>

        {/* ⚡ Entrega rápida */}
        <span className="flex items-center gap-1 sm:gap-2">
          <Zap size={16} /> 
          <span className="font-medium">{t("benefits.fast_delivery")}</span>
          <span className="text-neutral-500 hidden lg:inline">
            {t("benefits.fast_delivery_subtitle")}
          </span>
        </span>

        {/* ✅ Compras protegidas */}
        <span className="flex items-center gap-1 sm:gap-2">
          <ShieldCheck size={16} /> 
          <span className="font-medium">{t("benefits.protected_purchases")}</span>
        </span>
      </div>
    </div>
  );
}
