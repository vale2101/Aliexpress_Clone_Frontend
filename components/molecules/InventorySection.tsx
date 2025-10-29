import React from "react";
import { ProductoInterface } from "../../interfaces/product.interface";
import FormSection from "../atoms/FormSection";
import FormField from "../atoms/FormField";
import Input from "../atoms/Input";
import Select from "../atoms/Select";

interface InventorySectionProps {
  data: ProductoInterface;
  errors: Partial<ProductoInterface>;
  onChange: (field: keyof ProductoInterface, value: string | number) => void;
}

const InventorySection: React.FC<InventorySectionProps> = ({ data, errors, onChange }) => (
  <FormSection title="Inventario">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField label="Stock" required error={errors.stock}>
        <Input
          type="number"
          value={data.stock}
          onChange={(e) => onChange("stock", parseInt(e.target.value) || 0)}
          placeholder="0"
          className={errors.stock ? "border-red-500" : ""}
        />
      </FormField>

      <FormField label="Estado">
        <Select
          value={data.estado || "activo"}
          onChange={(e) => onChange("estado", e.target.value as "activo" | "inactivo")}
          options={[
            { value: "activo", label: "Activo" },
            { value: "inactivo", label: "Inactivo" },
          ]}
        />
      </FormField>
    </div>
  </FormSection>
);

export default InventorySection;
