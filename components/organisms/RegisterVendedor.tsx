"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import Logo from "../molecules/Logo";
import FormHeader from "../molecules/FormHeader";
import SubmitButton from "../molecules/SubmitButton";
import LocationSelector from "../molecules/LocationSelector";
import RegisterFields from "../molecules/RegisterFields";

const RegisterFormRefactored: React.FC = () => {
  const { register, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [selectedLocation, setSelectedLocation] = useState("Colombia");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = (): boolean => {
    const {
      nombre,
      apellido,
      email,
      telefono,
      contrasena,
      confirmarContrasena,
    } = formData;

    return (
      !!nombre.trim() &&
      !!apellido.trim() &&
      !!email.trim() &&
      !!telefono.trim() &&
      !!contrasena.trim() &&
      !!confirmarContrasena.trim() &&
      contrasena === confirmarContrasena
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isFormValid()) {
      setErrorMessage("Por favor completa todos los campos correctamente.");
      return;
    }

    try {
      await register({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        contrasena: formData.contrasena,
        rol: 3,
        estado: "activo",
      });

      router.push("/cuenta/productos");
    } catch (err: any) {
      setErrorMessage(err.message || "Error al registrarse");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/cuenta/productos");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Rellena la información de registro
        </h2>

        {errorMessage && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              País de registro
            </label>
            <LocationSelector
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
            />
          </div>

          <RegisterFields
            nombre={formData.nombre}
            apellido={formData.apellido}
            email={formData.email}
            telefono={formData.telefono}
            contrasena={formData.contrasena}
            confirmarContrasena={formData.confirmarContrasena}
            onChange={handleChange}
          />

          <SubmitButton
            isLogin={false}
            isLoading={loading}
            disabled={!isFormValid()}
          />
        </form>

        <p className="mt-6 text-xs text-gray-500 text-center">
          Al continuar, aceptas nuestras políticas de uso.
        </p>
      </div>
    </div>
  );
};

export default RegisterFormRefactored;