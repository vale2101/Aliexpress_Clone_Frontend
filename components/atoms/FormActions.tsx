import React from "react";
import Button from "./Button";
import { X, Save } from "lucide-react";

interface FormActionsProps {
  onCancel: () => void;
  loading?: boolean;
  submitText?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onCancel, 
  loading = false, 
  submitText = "Guardar" 
}) => (
  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
    <Button
      type="button"
      onClick={onCancel}
      className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
    >
      <X className="w-4 h-4 mr-2" />
      Cancelar
    </Button>
    <Button
      type="submit"
      disabled={loading}
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
    >
      <Save className="w-4 h-4 mr-2" />
      {loading ? "Guardando..." : submitText}
    </Button>
  </div>
);

export default FormActions;
