"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

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

// Traducciones
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
  pt: {
    'search.placeholder': 'óculos inteligentes ia xiaomi',
    'header.download_app': 'Baixar App',
    'header.login': 'Entrar',
    'header.cart': 'Carrinho',
    'header.all_categories': 'Todas as categorias',
    'header.packs_offers': 'Pacotes de ofertas',
    'header.choice': 'Choice',
    'header.super_offers': 'Super Ofertas',
    'header.business': 'AliExpress Business',
    'header.computing': 'Informática e escola',
    'header.telephony': 'Telefonia e comunicação',
    'header.accessories': 'Acessórios',
    'header.jewelry': 'Joias e relógios',
    'header.more': 'Mais',
    'modal.send_to': 'Enviar para',
    'modal.language': 'Idioma',
    'modal.currency': 'Moeda',
    'modal.save': 'Salvar',
    'modal.country': 'País',
    'modal.state': 'Estado/Província',
    'modal.city': 'Cidade',
  }
};

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
  pt: [
    { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  ]
};

const states = {
  CO: ['Caldas', 'Antioquia', 'Cundinamarca', 'Valle del Cauca'],
  MX: ['Jalisco', 'Nuevo León', 'CDMX', 'Puebla'],
  AR: ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza'],
  ES: ['Madrid', 'Cataluña', 'Andalucía', 'Valencia'],
  US: ['California', 'Texas', 'Florida', 'New York'],
  CA: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
  GB: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  AU: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
  BR: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia'],
  PT: ['Lisboa', 'Porto', 'Braga', 'Coimbra'],
};

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
  'Cataluña': ['Barcelona', 'L\'Hospitalet', 'Badalona'],
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
  'São Paulo': ['São Paulo', 'Guarulhos', 'Campinas'],
  'Rio de Janeiro': ['Rio de Janeiro', 'Niterói', 'Nova Iguaçu'],
  'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem'],
  'Bahia': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
  'Lisboa': ['Lisboa', 'Sintra', 'Cascais'],
  'Porto': ['Porto', 'Vila Nova de Gaia', 'Matosinhos'],
  'Braga': ['Braga', 'Guimarães', 'Barcelos'],
  'Coimbra': ['Coimbra', 'Figueira da Foz', 'Cantanhede'],
};

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
  pt: [
    { code: 'BRL', name: 'Real brasileiro', symbol: 'R$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
  ]
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('es');
  const [currency, setCurrencyState] = useState('COP');
  const [country, setCountryState] = useState('Colombia');
  const [state, setStateState] = useState('Caldas');
  const [city, setCityState] = useState('Manizales');

  useEffect(() => {
    // Cargar configuración guardada
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      const prefs = JSON.parse(saved);
      setLanguageState(prefs.language || 'es');
      setCurrencyState(prefs.currency || 'COP');
      setCountryState(prefs.country || 'Colombia');
      setStateState(prefs.state || 'Caldas');
      setCityState(prefs.city || 'Manizales');
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('userPreferences', JSON.stringify({
      language: lang,
      currency,
      country,
      state,
      city
    }));
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    localStorage.setItem('userPreferences', JSON.stringify({
      language,
      currency: curr,
      country,
      state,
      city
    }));
  };

  const setLocation = (newCountry: string, newState: string, newCity: string) => {
    setCountryState(newCountry);
    setStateState(newState);
    setCityState(newCity);
    localStorage.setItem('userPreferences', JSON.stringify({
      language,
      currency,
      country: newCountry,
      state: newState,
      city: newCity
    }));
  };

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations[typeof language]] || key;
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
