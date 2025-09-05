"use client";

import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function BenefitsStrip() {
  const { t } = useLanguage();
  return (
    <div className="w-full border-y bg-white">
      <div className="container-xl flex h-12 items-center justify-between text-sm">
        <span className="flex items-center gap-2">
          🚚 {t('benefits.free_shipping')} <span className="text-neutral-500">{t('benefits.free_shipping_subtitle')}</span>
        </span>
        <span className="flex items-center gap-2">
          ⚡ {t('benefits.fast_delivery')} <span className="text-neutral-500">{t('benefits.fast_delivery_subtitle')}</span>
        </span>
        <span className="flex items-center gap-2">✅ {t('benefits.protected_purchases')}</span>
      </div>
    </div>
  );
}
