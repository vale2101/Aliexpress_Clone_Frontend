import React from "react";
import Text from "./Typography";

interface ResultCountProps {
  count: number;
  searchTerm: string;
}

const ResultCount: React.FC<ResultCountProps> = ({ count, searchTerm }) => {
  return (
    <Text variant="body" className="text-gray-600">
      {count} {count === 1 ? 'resultado' : 'resultados'} para "{searchTerm}"
    </Text>
  );
};

export default ResultCount;

