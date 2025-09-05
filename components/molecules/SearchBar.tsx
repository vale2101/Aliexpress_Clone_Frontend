"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../atoms/Input";
import { Search, Camera } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function SearchBar({ className = "" }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navegar a página de búsqueda con el query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleImageSearch = () => {
    // Funcionalidad para búsqueda por imagen
    console.log("Búsqueda por imagen");
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center border rounded-full w-full overflow-hidden ${className}`}>
      <Input 
        placeholder={t('search.placeholder')} 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-none flex-1 h-11 focus:outline-none" 
      />
      
      {/* Botón de búsqueda por imagen */}
      <button
        type="button"
        onClick={handleImageSearch}
        className="px-3 py-2 hover:bg-gray-100 flex items-center h-11"
        title="Búsqueda por imagen"
      >
        <Camera className="w-5 h-5 text-gray-600" />
      </button>
      
      {/* Botón de búsqueda */}
      <button 
        type="submit"
        className="bg-black text-white px-4 py-2 flex items-center h-11 hover:bg-gray-800 transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
