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
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleImageSearch = () => {
    console.log("Búsqueda por imagen");
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center border border-gray-300 rounded-full w-full overflow-hidden hover:border-orange-500 focus-within:border-orange-500 transition-colors ${className}`}>
      <Input 
        placeholder="mecanismo de tijera teclado victus" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
