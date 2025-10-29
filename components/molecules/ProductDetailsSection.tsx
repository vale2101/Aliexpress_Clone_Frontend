import React from "react";
import { ProductoInterface } from "../../interfaces/product.interface";
import FormSection from "../atoms/FormSection";
import FormField from "../atoms/FormField";
import Input from "../atoms/Input";

interface ProductDetailsSectionProps {
  data: ProductoInterface;
  errors: Partial<ProductoInterface>;
  onChange: (field: keyof ProductoInterface, value: string | number) => void;
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({ data, errors, onChange }) => (
  <FormSection title="Detalles del Producto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField label="Material">
        <Input
          value={data.material || ""}
          onChange={(e) => onChange("material", e.target.value)}
          placeholder="Ej: Algodón, Plástico, Metal"
        />
      </FormField>

      <FormField label="Color">
        <Input
          value={data.color || ""}
          onChange={(e) => onChange("color", e.target.value)}
          placeholder="Ej: Rojo, Azul, Negro"
        />
      </FormField>

      <FormField label="Peso (kg)">
        <Input
          type="number"
          step="0.1"
          value={data.peso || ""}
          onChange={(e) => onChange("peso", parseFloat(e.target.value) || 0)}
          placeholder="0.0"
        />
      </FormField>

      <FormField label="Dimensiones">
        <Input
          value={data.dimensiones || ""}
          onChange={(e) => onChange("dimensiones", e.target.value)}
          placeholder="Ej: 10x15x5 cm"
        />
      </FormField>

      <div className="md:col-span-2">
        <FormField label="Descripción Comercial">
          <textarea
            value={data.descripcionCom || ""}
            onChange={(e) => onChange("descripcionCom", e.target.value)}
            placeholder="Descripción para marketing y ventas"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            rows={3}
          />
        </FormField>
      </div>
    </div>
  </FormSection>
);

export default ProductDetailsSection;
