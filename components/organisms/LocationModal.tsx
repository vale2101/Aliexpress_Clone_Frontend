"use client";

import React, { useState, useEffect } from "react";
import { useLanguage, countries, states, cities, currencies } from "../../contexts/LanguageContext";
import { X } from "lucide-react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseLeave?: () => void;
}

export default function LocationModal({ isOpen, onClose, onMouseLeave }: LocationModalProps) {
  const { 
    language, 
    currency, 
    country, 
    state, 
    city, 
    setLanguage, 
    setCurrency, 
    setLocation, 
    t 
  } = useLanguage();

  const [selectedCountry, setSelectedCountry] = useState(country);
  const [selectedState, setSelectedState] = useState(state);
  const [selectedCity, setSelectedCity] = useState(city);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const currentCountries = countries[selectedLanguage as keyof typeof countries] || countries.es;
  
  const selectedCountryCode = currentCountries.find(c => c.name === selectedCountry)?.code || 'CO';
  const currentStates = states[selectedCountryCode as keyof typeof states] || [];
  const currentCities = cities[selectedState as keyof typeof cities] || [];
  const currentCurrencies = currencies[selectedLanguage as keyof typeof currencies] || currencies.es;

  useEffect(() => {
    if (selectedCountry && currentStates.length === 0) {
      setSelectedState('');
      setSelectedCity('');
    }
  }, [selectedCountry, currentStates.length]);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ];

  const handleSave = () => {
    setLanguage(selectedLanguage);
    setCurrency(selectedCurrency);
    setLocation(selectedCountry, selectedState, selectedCity);
    onClose();
  };

  const handleCountryChange = (newCountry: string) => {
    setSelectedCountry(newCountry);
    setSelectedState('');
    setSelectedCity('');
    setShowCountryDropdown(false);
    setShowStateDropdown(false);
    setShowCityDropdown(false);
  };

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    setSelectedCity('');
    setShowStateDropdown(false);
    setShowCityDropdown(false);
  };

  const handleCityChange = (newCity: string) => {
    setSelectedCity(newCity);
    setShowCityDropdown(false);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    setShowLanguageDropdown(false);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setSelectedCurrency(newCurrency);
    setShowCurrencyDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 bg-transparent z-50"
    >
      <div 
        className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 w-80 sm:w-96 lg:w-full max-w-md shadow-lg border border-gray-200"
        onMouseEnter={(e) => e.stopPropagation()}
        {...(onMouseLeave && { onMouseLeave })}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Configuración</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">{t('modal.send_to')}</h3>
          
          <div className="relative mb-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCountryDropdown(!showCountryDropdown);
              }}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 text-sm sm:text-base"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {currentCountries.find(c => c.name === selectedCountry)?.flag || '🇨🇴'}
                </span>
                <span>{selectedCountry || t('modal.country')}</span>
              </div>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showCountryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {currentCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCountryChange(country.name);
                    }}
                    className="w-full text-left p-3 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span>{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative mb-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowStateDropdown(!showStateDropdown);
              }}
              disabled={!selectedCountry}
              className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <span>{selectedState || t('modal.state')}</span>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showStateDropdown && currentStates.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {currentStates.map((state) => (
                  <button
                    key={state}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStateChange(state);
                    }}
                    className="w-full text-left p-3 hover:bg-gray-100"
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCityDropdown(!showCityDropdown);
              }}
              disabled={!selectedState}
              className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <span>{selectedCity || t('modal.city')}</span>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showCityDropdown && currentCities.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {currentCities.map((city) => (
                  <button
                    key={city}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCityChange(city);
                    }}
                    className="w-full text-left p-3 hover:bg-gray-100"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">{t('modal.language')}</h3>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowLanguageDropdown(!showLanguageDropdown);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {languages.find(l => l.code === selectedLanguage)?.flag || '🇪🇸'}
                </span>
                <span>{languages.find(l => l.code === selectedLanguage)?.name || 'Español'}</span>
              </div>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange(lang.code);
                    }}
                    className="w-full text-left p-3 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">{t('modal.currency')}</h3>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCurrencyDropdown(!showCurrencyDropdown);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400"
            >
              <span>
                {currentCurrencies.find(c => c.code === selectedCurrency)?.code} 
                ({currentCurrencies.find(c => c.code === selectedCurrency)?.name})
              </span>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showCurrencyDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {currentCurrencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCurrencyChange(curr.code);
                    }}
                    className="w-full text-left p-3 hover:bg-gray-100"
                  >
                    {curr.code} ({curr.name})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSave();
          }}
          className="w-full bg-gray-800 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-900 transition-colors font-medium text-sm sm:text-base"
        >
          {t('modal.save')}
        </button>
      </div>
    </div>
  );
}
