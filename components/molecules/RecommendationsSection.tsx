import React from "react";
import Text from "../atoms/Typography";

const RecommendationsSection: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <Text variant="title" className="font-bold mb-4">Seguro que te gusta</Text>
      <div className="text-center py-8 text-gray-500">
        <Text variant="body">No hay recomendaciones disponibles en este momento</Text>
      </div>
    </div>
  );
};

export default RecommendationsSection;
