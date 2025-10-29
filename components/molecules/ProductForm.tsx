"use client";
import React, { useState } from "react";
import { ProductoInterface } from "../../interfaces/product.interface";
import FormActions from "../atoms/FormActions";
import BasicInfoSection from "./BasicInfoSection";
import PricingSection from "./PricingSection";
import InventorySection from "./InventorySection";
import ProductDetailsSection from "./ProductDetailsSection";
import ImageSection from "./ImageSection";

interface ProductFormProps {
  onSave: (producto: ProductoInterface) => Promise<boolean>;
  onCancel: () => void;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSave, onCancel, loading = false }) => {
  
  const [formData, setFormData] = useState<ProductoInterface>({
    nombre: "",
    descripcion: "",
    precio: 0,
    precio_original: 0,
    descuento: 0,
    moneda: "USD",
    stock: 0,
    estado: "activo",
    material: "",
    color: "",
    peso: 0,
    dimensiones: "",
    descripcionCom: "",
    imagen_url: "",
    categoria: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ProductoInterface, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (formData.precio <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0";
    }

    if (formData.stock < 0) {
      newErrors.stock = "El stock no puede ser negativo";
    }

    if (formData.precio_original && formData.precio_original <= formData.precio) {
      newErrors.precio_original = "El precio original debe ser mayor al precio actual";
    }

    if (formData.descuento && formData.descuento > 100) {
      newErrors.descuento = "El descuento no puede ser mayor a 100";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const success = await onSave(formData);
    if (success) {
      setFormData({
        nombre: "",
        descripcion: "",
        precio: 0,
        precio_original: 0,
        descuento: 0,
        moneda: "USD",
        stock: 0,
        estado: "activo",
        material: "",
        color: "",
        peso: 0,
        dimensiones: "",
        descripcionCom: "",
        imagen_url: "",
        categoria: "",
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoSection 
        data={formData} 
        errors={errors} 
        onChange={handleInputChange} 
      />
      
      <PricingSection 
        data={formData} 
        errors={errors} 
        onChange={handleInputChange} 
      />
      
      <InventorySection 
        data={formData} 
        errors={errors} 
        onChange={handleInputChange} 
      />
      
      <ProductDetailsSection 
        data={formData} 
        errors={errors} 
        onChange={handleInputChange} 
      />
      
      <ImageSection 
        data={formData} 
        errors={errors} 
        onChange={handleInputChange} 
      />

      <FormActions 
        onCancel={onCancel} 
        loading={loading} 
        submitText="Guardar Producto" 
      />
    </form>
  );
};

export default ProductForm;
