"use client";

import React, { useEffect, useState } from "react";
import { useLanguage, countries, states, cities, currencies } from "../../contexts/LanguageContext";
import { X } from "lucide-react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
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

  const [selectedCountry, setSelectedCountry] = useState(country || "");
  const [selectedState, setSelectedState] = useState(state || "");
  const [selectedCity, setSelectedCity] = useState(city || "");
  const [selectedLanguage, setSelectedLanguage] = useState(language || "es");
  const [selectedCurrency, setSelectedCurrency] = useState(currency || "COP");

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Listas según idioma seleccionado
  const currentCountries =
    countries[selectedLanguage as keyof typeof countries] || countries.es;

  // ⚠️ Obtener código del país desde el nombre para indexar estados
  const countryObj = currentCountries.find(c => c.name === selectedCountry);
  const currentStates = countryObj
    ? (states as any)[countryObj.code] || []
    : [];

  const currentCities = (cities as any)[selectedState] || [];
  const currentCurrencies =
    currencies[selectedLanguage as keyof typeof currencies] || currencies.es;

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  useEffect(() => {
    if (isOpen) {
      setSelectedLanguage(language || "es");
      setSelectedCurrency(currency || "COP");
      setSelectedCountry(country || "");
      setSelectedState(state || "");
      setSelectedCity(city || "");
    }
  }, [isOpen, language, currency, country, state, city]);

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
  };

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    setSelectedCity('');
    setShowStateDropdown(false);
  };

  const handleCityChange = (newCity: string) => {
    setSelectedCity(newCity);
    setShowCityDropdown(false);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    // al cambiar idioma reiniciamos selección territorial (los nombres cambian)
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
    setShowLanguageDropdown(false);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setSelectedCurrency(newCurrency);
    setShowCurrencyDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Configuración</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Enviar a */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('modal.send_to')}</h3>
          
          {/* País */}
          <div className="relative mb-3">
            <button
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {countryObj?.flag || '🌍'}
                </span>
                <span>{selectedCountry || t('modal.country')}</span>
              </div>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showCountryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {currentCountries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleCountryChange(c.name)}
                    className="w-full text-left p-3 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Estado/Provincia */}
          <div className="relative mb-3">
            <button
              onClick={() => setShowStateDropdown(!showStateDropdown)}
              disabled={!selectedCountry}
              className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <span>{selectedState || t('modal.state')}</span>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showStateDropdown && currentStates.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {currentStates.map((st: string) => (
                  <button
                    key={st}
                    onClick={() => handleStateChange(st)}
                    className="w-full text-left p-3 hover:bg-gray-100"
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ciudad */}
          <div className="relative">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              disabled={!selectedState}
              className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <span>{selectedCity || t('modal.city')}</span>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showCityDropdown && currentCities.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {currentCities.map((ct: string) => (
                  <button
                    key={ct}
                    onClick={() => handleCityChange(ct)}
                    className="w-full text-left p-3 hover:bg-gray-100"
                  >
                    {ct}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Idioma */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('modal.language')}</h3>
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {selectedLanguage === 'en' ? '🇺🇸' : '🇪🇸'}
                </span>
                <span>{selectedLanguage === 'en' ? 'English' : 'Español'}</span>
              </div>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {[{code:'es',name:'Español',flag:'🇪🇸'},{code:'en',name:'English',flag:'🇺🇸'}].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
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

        {/* Moneda */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('modal.currency')}</h3>
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
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
                    onClick={() => handleCurrencyChange(curr.code)}
                    className="w-full text-left p-3 hover:bg-gray-100"
                  >
                    {curr.code} ({curr.name})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Guardar */}
        <button
          onClick={handleSave}
          className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors font-medium"
        >
          {t('modal.save')}
        </button>
      </div>
    </div>
  );
}
