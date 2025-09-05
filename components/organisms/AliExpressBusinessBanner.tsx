"use client";

import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function AliExpressBusinessBanner() {
  const { t } = useLanguage();
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJibHVyIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI0Ii8+PC9maWx0ZXI+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWx0ZXI9InVybCgjYmx1cikiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=')] bg-cover bg-center opacity-20"></div>
      
      <div className="relative max-w-full mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Business Features */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-yellow-800 text-lg">👑</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{t('business.title')}</h1>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <span className="text-gray-700 text-lg">{t('business.tax_exemptions')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <span className="text-gray-700 text-lg">{t('business.express_payments')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <span className="text-gray-700 text-lg">{t('business.financial_support')}</span>
            </div>
          </div>
          
          <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg">
            {t('business.buy')}
          </button>
        </div>
        
        {/* Right Side - Statistics */}
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-blue-600">5M+</div>
            <div className="text-sm text-gray-600">{t('business.direct_supply')}</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-blue-600">10</div>
            <div className="text-sm text-gray-600">{t('business.local_warehouses')}</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-blue-600">20M+</div>
            <div className="text-sm text-gray-600">{t('business.dropshipping_items')}</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-blue-600">24H</div>
            <div className="text-sm text-gray-600">{t('business.custom_sourcing')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
