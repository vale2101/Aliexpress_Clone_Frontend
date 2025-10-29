import React from "react";
import { ProductoInterface } from "../../interfaces/product.interface";
import FormSection from "../atoms/FormSection";
import FormField from "../atoms/FormField";
import Input from "../atoms/Input";
import Select from "../atoms/Select";

interface PricingSectionProps {
  data: ProductoInterface;
  errors: Partial<ProductoInterface>;
  onChange: (field: keyof ProductoInterface, value: string | number) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ data, errors, onChange }) => (
  <FormSection title="Precios">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField label="Precio Actual" required error={errors.precio}>
        <Input
          type="number"
          value={data.precio}
          onChange={(e) => onChange("precio", parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          className={errors.precio ? "border-red-500" : ""}
        />
      </FormField>

      <FormField label="Precio Original" error={errors.precio_original}>
        <Input
          type="number"
          value={data.precio_original || ""}
          onChange={(e) => onChange("precio_original", parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          className={errors.precio_original ? "border-red-500" : ""}
        />
      </FormField>

      <FormField label="Descuento (%)" error={errors.descuento}>
        <Input
          type="number"
          value={data.descuento || ""}
          onChange={(e) => onChange("descuento", parseFloat(e.target.value) || 0)}
          placeholder="0"
          className={errors.descuento ? "border-red-500" : ""}
        />
      </FormField>

      <FormField label="Moneda">
        <Select
          value={data.moneda || "USD"}
          onChange={(e) => onChange("moneda", e.target.value)}
          options={[
            { value: "USD", label: "USD" },
            { value: "EUR", label: "EUR" },
            { value: "MXN", label: "MXN" },
            { value: "COP", label: "COP" },
          ]}
        />
      </FormField>
    </div>
  </FormSection>
);

export default PricingSection;
