import React from "react";
import Text from "../atoms/Typography";

interface StatsCardProps {
  title: string;
  value: number;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  color = "text-gray-900" 
}) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <Text variant="small" className="text-gray-600 mb-1">{title}</Text>
    <Text variant="subtitle" className={`font-bold text-2xl ${color}`}>{value}</Text>
  </div>
);

export default StatsCard;
