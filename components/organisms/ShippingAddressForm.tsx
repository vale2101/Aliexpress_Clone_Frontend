"use client";

import React, { useState } from "react";
import FormHeader from "../molecules/FormHeader";
import AddressFields from "../molecules/AddressFields";
import LocationSelector from "../molecules/LocationSelector";
import CheckboxField from "../molecules/CheckboxField";
import SubmitButton from "../molecules/SubmitButton";
import CancelButton from "../molecules/CancelButton";
import ErrorText from "../atoms/ErrorText";

import { AddressInterface } from "../../interfaces/address.interface";
import { addressService } from "../../services/addressService";
import { useAuth } from "../../contexts/AuthContext"; // ✅ nuevo

interface Props {
  initialData?: AddressInterface;
  onSubmit?: (data: AddressInterface) => void;
  onCancel?: () => void;
}

const ShippingAddressForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const { user } = useAuth(); 
  const [formData, setFormData] = useState<AddressInterface>(() =>
    initialData || {
      id_usuario: user?.id_usuario || 0, 
      pais: "Colombia",
      ciudad: "",
      direccion_detalle: "",
      codigo_postal: "",
    }
  );

  const [predeterminada, setPredeterminada] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field: keyof AddressInterface, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (
      formData.ciudad.trim().length < 5 ||
      formData.direccion_detalle.trim().length < 5 ||
      formData.codigo_postal.trim().length < 5 
    ) {
      setErrorMessage("Todos los campos deben tener al menos 5 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const success = await addressService.create(formData);
      if (!success) {
        setErrorMessage("No se pudo guardar la dirección.");
        return;
      }

      if (onSubmit) onSubmit(formData);
    } catch (err: any) {
      console.error("Error al guardar la dirección:", err);
      setErrorMessage("Error inesperado al guardar la dirección.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
      <FormHeader title="Dirección de envío" />

      {errorMessage && <ErrorText message={errorMessage} />}

      <div className="space-y-4">
        <LocationSelector
          selectedLocation={formData.pais}
          onLocationChange={(value) => handleChange("pais", value)}
        />

        <AddressFields
          ciudad={formData.ciudad}
          direccion_detalle={formData.direccion_detalle}
          codigo_postal={formData.codigo_postal}
          onChange={handleChange}
        />

        <CheckboxField
          label="Guardar como predeterminada"
          checked={predeterminada}
          onChange={setPredeterminada}
        />

        <div className="flex gap-4 pt-4">
          <SubmitButton isLoading={loading} />
          <CancelButton onClick={onCancel || (() => setFormData(initialData || formData))} />
        </div>
      </div>
    </form>
  );
};

export default ShippingAddressForm;