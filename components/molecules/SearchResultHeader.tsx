import React from "react";
import Text from "../atoms/Typography";
import ResultCount from "../atoms/ResultCount";
import ClearButton from "../atoms/ClearButton";
import SearchBar from "./SearchBar";

interface SearchResultHeaderProps {
  searchQuery: string;
  resultCount: number;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

const SearchResultHeader: React.FC<SearchResultHeaderProps> = ({
  searchQuery,
  resultCount,
  onSearchChange,
  onClearSearch
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Text variant="title" className="font-bold text-gray-900 mb-2">
            Resultados de Búsqueda
          </Text>
          {searchQuery && (
            <div className="flex items-center gap-2">
              <ResultCount count={resultCount} searchTerm={searchQuery} />
              <ClearButton onClick={onClearSearch} />
            </div>
          )}
        </div>
      </div>
      <div className="max-w-2xl">
        <SearchBar className="w-full" onSearchChange={onSearchChange} />
      </div>
    </div>
  );
};

export default SearchResultHeader;

