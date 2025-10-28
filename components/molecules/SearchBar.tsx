"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Input from "../atoms/Input";
import { Search, Camera } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface SearchBarProps {
  className?: string;
  onSearchChange?: (query: string) => void;
}

export default function SearchBar({ className = "", onSearchChange }: SearchBarProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  // Sincronizar el valor con la URL cuando cambia
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    if (pathname === "/search" && urlQuery !== searchQuery) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleImageSearch = () => {
    console.log("Búsqueda por imagen");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Si estamos en la página de búsqueda, actualizar inmediatamente
    if (pathname === "/search" && onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center border border-gray-300 rounded-full w-full overflow-hidden hover:border-orange-500 focus-within:border-orange-500 transition-colors ${className}`}>
      <Input 
        placeholder="mecanismo de tijera teclado victus" 
        value={searchQuery}
        onChange={handleChange}
        className="border-none flex-1 h-8 sm:h-10 lg:h-11 px-2 sm:px-3 lg:px-4 focus:outline-none text-gray-700 text-sm sm:text-base" 
      />
      
      <button
        type="button"
        onClick={handleImageSearch}
        className="hidden sm:flex px-2 lg:px-3 py-2 hover:bg-gray-100 items-center h-8 sm:h-10 lg:h-11 border-l border-gray-300"
        title="Búsqueda por imagen"
      >
        <Camera className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
      </button>
      
      <button 
        type="submit"
        className="bg-black text-white px-2 sm:px-3 lg:px-4 py-2 flex items-center h-8 sm:h-10 lg:h-11 hover:bg-gray-800 transition-colors rounded-r-full"
      >
        <Search className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
    </form>
  );
}
