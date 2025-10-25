import React from "react";
import Text from "../atoms/Typography";

const HelpWidget: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center bg-yellow-400 rounded-full p-3 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
        </div>
        <div className="ml-2 bg-white rounded-full px-3 py-1">
          <Text variant="small" className="text-gray-700">¿Necesitas ayuda?</Text>
        </div>
      </div>
    </div>
  );
};

export default HelpWidget;
