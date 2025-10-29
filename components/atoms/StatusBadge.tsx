import React from "react";

interface StatusBadgeProps {
  estado?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ estado }) => {
  const isActive = estado === "activo";
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {estado || "Sin estado"}
    </span>
  );
};

export default StatusBadge;
