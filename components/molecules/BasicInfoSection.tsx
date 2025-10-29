import React from "react";
import { ProductoInterface } from "../../interfaces/product.interface";
import FormSection from "../atoms/FormSection";
import FormField from "../atoms/FormField";
import Input from "../atoms/Input";

interface BasicInfoSectionProps {
  data: ProductoInterface;
  errors: Partial<ProductoInterface>;
  onChange: (field: keyof ProductoInterface, value: string) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ data, errors, onChange }) => (
  <FormSection title="Información Básica">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField label="Nombre del Producto" required error={errors.nombre}>
        <Input
          value={data.nombre}
          onChange={(e) => onChange("nombre", e.target.value)}
          placeholder="Ingresa el nombre del producto"
          className={errors.nombre ? "border-red-500" : ""}
        />
      </FormField>

      <FormField label="Categoría">
        <Input
          value={data.categoria || ""}
          onChange={(e) => onChange("categoria", e.target.value)}
          placeholder="Ej: Electrónicos, Ropa, Hogar"
        />
      </FormField>

      <div className="md:col-span-2">
        <FormField label="Descripción">
          <textarea
            value={data.descripcion || ""}
            onChange={(e) => onChange("descripcion", e.target.value)}
            placeholder="Describe las características principales del producto"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            rows={3}
          />
        </FormField>
      </div>
    </div>
  </FormSection>
);

export default BasicInfoSection;
