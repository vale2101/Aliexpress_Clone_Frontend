import React from "react";
import { Search } from "lucide-react";
import Text from "../atoms/Typography";

interface SearchEmptyStateProps {
  title: string;
  message: string;
}

const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({ title, message }) => {
  return (
    <div className="text-center py-12">
      <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <Text variant="title" className="font-bold text-gray-500 mb-2">
        {title}
      </Text>
      <Text variant="body" className="text-gray-400">
        {message}
      </Text>
    </div>
  );
};

export default SearchEmptyState;

