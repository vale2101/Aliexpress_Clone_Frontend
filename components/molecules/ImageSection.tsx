import React from "react";
import { ProductoInterface } from "../../interfaces/product.interface";
import FormSection from "../atoms/FormSection";
import FormField from "../atoms/FormField";
import Input from "../atoms/Input";

interface ImageSectionProps {
  data: ProductoInterface;
  errors: Partial<ProductoInterface>;
  onChange: (field: keyof ProductoInterface, value: string) => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({ data, errors, onChange }) => (
  <FormSection title="Imagen del Producto">
    <div>
      <FormField label="URL de la Imagen">
        <Input
          value={data.imagen_url || ""}
          onChange={(e) => onChange("imagen_url", e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </FormField>
    </div>
  </FormSection>
);

export default ImageSection;
