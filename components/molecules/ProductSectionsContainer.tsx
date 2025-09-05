import React from "react";
import BatchSavingZone from "../organisms/BatchSavingZone";
import BuyAgainSection from "../organisms/BuyAgainSection";

export default function ProductSectionsContainer() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-full mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <BatchSavingZone />
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <BuyAgainSection />
          </div>
        </div>
      </div>
    </div>
  );
}
