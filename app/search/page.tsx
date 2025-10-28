"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "../../hooks/useSearch";
import SearchResultsContent from "../../components/organisms/SearchResultsContent";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredProducts, 
    loading, 
    stats,
    loadProducts,
    clearSearch 
  } = useSearch({ initialQuery: query });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (query && query !== searchQuery) {
      setSearchQuery(query);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <SearchResultsContent
          searchQuery={searchQuery}
          filteredProducts={filteredProducts}
          loading={loading}
          stats={stats}
          onClearSearch={clearSearch}
        />
      </div>
    </div>
  );
}
