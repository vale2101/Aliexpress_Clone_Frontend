"use client";
import React from "react";
import Button from "./Button";
import { Edit, Eye, EyeOff } from "lucide-react";

interface ActionButtonsProps {
  id?: number;
  estado?: string;
  onEdit: (id: number) => void;
  onToggleState: (id: number) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  id, 
  estado, 
  onEdit, 
  onToggleState 
}) => {
  if (!id) return null;
  
  const isActive = estado === "activo";
  
  return (
    <div className="flex justify-end gap-2">
      <Button
        className="text-orange-600 hover:text-orange-800 p-2"
        onClick={() => onEdit(id)}
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        className={`p-2 ${isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
        onClick={() => onToggleState(id)}
        title={isActive ? "Desactivar producto" : "Activar producto"}
      >
        {isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default ActionButtons;
