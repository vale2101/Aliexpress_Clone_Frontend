"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  placeholder?: string;
  onSubmit?: (term: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, placeholder = "Las mejores ofertas en un solo lugar...", onSubmit, className }) => {
  const [internalValue, setInternalValue] = useState<string>(searchTerm ?? "");

  useEffect(() => {
    if (typeof searchTerm === "string") {
      setInternalValue(searchTerm);
    }
  }, [searchTerm]);

  const value = typeof searchTerm === "string" ? searchTerm : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (onSearchChange) {
      onSearchChange(next);
    } else {
      setInternalValue(next);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className ?? ""}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full pr-24 pl-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 active:bg-black inline-flex items-center justify-center gap-1"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
};

export default SearchBar;