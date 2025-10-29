"use client";
import React, { useState } from "react";
import { ProductoInterface } from "../../interfaces/product.interface";
import { productService } from "../../services/productService";
import ProductForm from "../molecules/ProductForm";
import Text from "../atoms/Typography";
import { X } from "lucide-react";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onProductAdded 
}) => {
  const [loading, setLoading] = useState(false);

  const handleSave = async (producto: ProductoInterface): Promise<boolean> => {
    try {
      setLoading(true);
      
      const success = await productService.create(producto);
      
      if (success) {
        alert("Producto creado correctamente");
        onProductAdded();
        onClose();
        return true;
      } else {
        alert("Error al crear el producto. Intenta de nuevo.");
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      alert(`Error al crear el producto: ${errorMessage}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <Text variant="title" className="font-bold text-gray-900">
              Nuevo Producto
            </Text>
            <Text variant="body" className="text-gray-600 mt-1">
              Completa la información del producto
            </Text>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <ProductForm
            onSave={handleSave}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
