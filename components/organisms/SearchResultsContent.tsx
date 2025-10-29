"use client";

import React from "react";
import SearchResultHeader from "../molecules/SearchResultHeader";
import SearchLoadingState from "../molecules/SearchLoadingState";
import SearchEmptyState from "../molecules/SearchEmptyState";
import ProductGrid from "../molecules/ProductGrid";

interface SearchResultsContentProps {
  searchQuery: string;
  filteredProducts: any[];
  loading: boolean;
  stats: {
    filtered: number;
    total: number;
    searchTerm: string;
  };
  onClearSearch: () => void;
}

const SearchResultsContent: React.FC<SearchResultsContentProps> = ({
  searchQuery,
  filteredProducts,
  loading,
  stats,
  onClearSearch
}) => {
  if (loading) {
    return <SearchLoadingState />;
  }

  return (
    <>
      <SearchResultHeader
        searchQuery={searchQuery}
        resultCount={stats.filtered}
        onClearSearch={onClearSearch}
      />

      {stats.filtered === 0 && searchQuery && (
        <SearchEmptyState
          title="No se encontraron resultados"
          message="Intenta con otros términos de búsqueda"
        />
      )}

      {!searchQuery && stats.total === 0 && (
        <SearchEmptyState
          title="Busca productos"
          message="Escribe en la barra de búsqueda para encontrar lo que necesitas"
        />
      )}

      {filteredProducts.length > 0 && (
        <ProductGrid products={filteredProducts} />
      )}
    </>
  );
};

export default SearchResultsContent;

