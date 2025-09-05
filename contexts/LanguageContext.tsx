"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface LanguageContextType {
  language: string;
  currency: string;
  country: string;
  state: string;
  city: string;
  setLanguage: (lang: string) => void;
  setCurrency: (curr: string) => void;
  setLocation: (country: string, state: string, city: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones (ES/EN)
const translations = {
  es: {
    'search.placeholder': 'gafas ia inteligentes xiaomi',
    'header.download_app': 'Descargar App',
    'header.login': 'Ingresar',
    'header.cart': 'Carrito',
    'header.all_categories': 'Todas las categorías',
    'header.packs_offers': 'Packs de ofertas',
    'header.choice': 'Choice',
    'header.super_offers': 'SuperOfertas',
    'header.business': 'AliExpress Business',
    'header.computing': 'Informática y escuela',
    'header.telephony': 'Telefonía y comunicación',
    'header.accessories': 'Accesorios',
    'header.jewelry': 'Bisutería y relojes',
    'header.more': 'Más',
    'modal.send_to': 'Enviar a',
    'modal.language': 'Idioma',
    'modal.currency': 'Moneda',
    'modal.save': 'Guardar',
    'modal.country': 'País',
    'modal.state': 'Estado/Provincia',
    'modal.city': 'Ciudad',
  },
  en: {
    'search.placeholder': 'smart ai glasses xiaomi',
    'header.download_app': 'Download App',
    'header.login': 'Login',
    'header.cart': 'Cart',
    'header.all_categories': 'All Categories',
    'header.packs_offers': 'Offer Packs',
    'header.choice': 'Choice',
    'header.super_offers': 'Super Offers',
    'header.business': 'AliExpress Business',
    'header.computing': 'Computing & School',
    'header.telephony': 'Phones & Communication',
    'header.accessories': 'Accessories',
    'header.jewelry': 'Jewelry & Watches',
    'header.more': 'More',
    'modal.send_to': 'Send to',
    'modal.language': 'Language',
    'modal.currency': 'Currency',
    'modal.save': 'Save',
    'modal.country': 'Country',
    'modal.state': 'State/Province',
    'modal.city': 'City',
  },
} as const;

// Países por idioma visible (solo ES/EN)
const countries = {
  es: [
    { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { code: 'MX', name: 'México', flag: '🇲🇽' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'ES', name: 'España', flag: '🇪🇸' },
  ],
  en: [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  ],
} as const;

// Estados por código de país
const states = {
  CO: ['Caldas', 'Antioquia', 'Cundinamarca', 'Valle del Cauca'],
  MX: ['Jalisco', 'Nuevo León', 'CDMX', 'Puebla'],
  AR: ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza'],
  ES: ['Madrid', 'Cataluña', 'Andalucía', 'Valencia'],
  US: ['California', 'Texas', 'Florida', 'New York'],
  CA: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
  GB: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  AU: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
} as const;

// Ciudades por nombre de estado
const cities = {
  'Caldas': ['Manizales', 'Pensilvania', 'La Dorada'],
  'Antioquia': ['Medellín', 'Bello', 'Itagüí'],
  'Cundinamarca': ['Bogotá', 'Soacha', 'Zipaquirá'],
  'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura'],
  'Jalisco': ['Guadalajara', 'Zapopan', 'Tlaquepaque'],
  'Nuevo León': ['Monterrey', 'San Nicolás', 'Guadalupe'],
  'CDMX': ['Ciudad de México', 'Iztapalapa', 'Gustavo A. Madero'],
  'Puebla': ['Puebla', 'Tehuacán', 'San Martín Texmelucan'],
  'Buenos Aires': ['Buenos Aires', 'La Plata', 'Mar del Plata'],
  'Córdoba': ['Córdoba', 'Río Cuarto', 'Villa María'],
  'Santa Fe': ['Rosario', 'Santa Fe', 'Rafaela'],
  'Mendoza': ['Mendoza', 'San Rafael', 'Godoy Cruz'],
  'Madrid': ['Madrid', 'Alcalá de Henares', 'Móstoles'],
  'Cataluña': ['Barcelona', "L'Hospitalet", 'Badalona'],
  'Andalucía': ['Sevilla', 'Málaga', 'Córdoba'],
  'Valencia': ['Valencia', 'Alicante', 'Elche'],
  'California': ['Los Angeles', 'San Francisco', 'San Diego'],
  'Texas': ['Houston', 'Dallas', 'Austin'],
  'Florida': ['Miami', 'Tampa', 'Orlando'],
  'New York': ['New York City', 'Buffalo', 'Rochester'],
  'Ontario': ['Toronto', 'Ottawa', 'Hamilton'],
  'Quebec': ['Montreal', 'Quebec City', 'Laval'],
  'British Columbia': ['Vancouver', 'Victoria', 'Surrey'],
  'Alberta': ['Calgary', 'Edmonton', 'Red Deer'],
  'England': ['London', 'Birmingham', 'Manchester'],
  'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen'],
  'Wales': ['Cardiff', 'Swansea', 'Newport'],
  'Northern Ireland': ['Belfast', 'Derry', 'Lisburn'],
  'New South Wales': ['Sydney', 'Newcastle', 'Wollongong'],
  'Victoria': ['Melbourne', 'Geelong', 'Ballarat'],
  'Queensland': ['Brisbane', 'Gold Coast', 'Townsville'],
  'Western Australia': ['Perth', 'Fremantle', 'Rockingham'],
} as const;

// Monedas por idioma visible
const currencies = {
  es: [
    { code: 'COP', name: 'Peso colombiano', symbol: '$' },
    { code: 'MXN', name: 'Peso mexicano', symbol: '$' },
    { code: 'ARS', name: 'Peso argentino', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
  ],
  en: [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  ],
} as const;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('es'); // default ES
  const [currency, setCurrencyState] = useState('COP');
  const [country, setCountryState] = useState('Colombia');
  const [state, setStateState] = useState('Caldas');
  const [city, setCityState] = useState('Manizales');

  useEffect(() => {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        const lang = ['es','en'].includes(prefs.language) ? prefs.language : 'es';
        setLanguageState(lang);
        setCurrencyState(prefs.currency || 'COP');
        setCountryState(prefs.country || 'Colombia');
        setStateState(prefs.state || 'Caldas');
        setCityState(prefs.city || 'Manizales');
      } catch {
        // mantener defaults
      }
    }
  }, []);

  const persist = (next: {
    language?: string; currency?: string; country?: string; state?: string; city?: string;
  }) => {
    const toSave = {
      language,
      currency,
      country,
      state,
      city,
      ...next,
    };
    localStorage.setItem('userPreferences', JSON.stringify(toSave));
  };

  const setLanguage = (lang: string) => {
    const safe = ['es','en'].includes(lang) ? lang : 'es';
    setLanguageState(safe);
    persist({ language: safe });
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    persist({ currency: curr });
  };

  const setLocation = (newCountry: string, newState: string, newCity: string) => {
    setCountryState(newCountry);
    setStateState(newState);
    setCityState(newCity);
    persist({ country: newCountry, state: newState, city: newCity });
  };

  const t = (key: string): string => {
    const dict = translations[language as 'es'|'en'] || translations.es;
    return (dict as Record<string,string>)[key] ?? translations.es[key as keyof typeof translations.es] ?? key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      currency,
      country,
      state,
      city,
      setLanguage,
      setCurrency,
      setLocation,
      t,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { countries, states, cities, currencies };
