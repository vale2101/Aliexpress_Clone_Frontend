import React, { useState } from 'react';

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocation,
  onLocationChange
}) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const locations = [
    "United States", "España", "México", "Colombia", "Argentina", 
    "Chile", "Perú", "Venezuela", "Ecuador", "Uruguay", "Paraguay"
  ];

  const handleLocationSelect = (location: string) => {
    onLocationChange(location);
    setShowLocationDropdown(false);
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg relative dropdown-container">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Pais :</span>
        <button 
          type="button"
          onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          className="flex items-center text-sm text-gray-700 hover:text-gray-900"
        >
          {selectedLocation}
          <svg 
            className={`w-4 h-4 ml-1 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {showLocationDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="max-h-48 overflow-y-auto">
            {locations.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => handleLocationSelect(location)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  selectedLocation === location ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
