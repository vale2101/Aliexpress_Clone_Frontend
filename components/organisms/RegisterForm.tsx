"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import ImageCarousel from "./ImageCarousel";
import FormHeader from "../molecules/FormHeader";
import SubmitButton from "../molecules/SubmitButton";
import LocationSelector from "../molecules/LocationSelector";
import Logo from "../molecules/Logo";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.contrasena !== formData.confirmarContrasena) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    if (!formData.nombre || !formData.email) {
      setErrorMessage("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      await register({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        contrasena: formData.contrasena,
        rol: 2,
        estado: "activo",
      });

      router.push("/login");
    } catch (err: any) {
      setErrorMessage(err.message || "Error al registrarse");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex">
      <div className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <Logo />
        </div>
      </div>

      <div className="hidden lg:flex lg:w-2/3 relative mt-16">
        <ImageCarousel />
      </div>

      <div className="w-full lg:w-1/3 bg-white flex items-center justify-center p-8 mt-16">
        <div className="w-full max-w-md">
          <FormHeader isLogin={false} />

          {errorMessage && (
            <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <RegisterFields
              nombre={formData.nombre}
              apellido={formData.apellido}
              email={formData.email}
              telefono={formData.telefono}
              contrasena={formData.contrasena}
              confirmarContrasena={formData.confirmarContrasena}
              onChange={handleChange}
            />

            <SubmitButton isLogin={false} isLoading={loading} />
          </form>

          <LocationSelector
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
          />

          <div className="mt-6 text-xs text-gray-500 leading-relaxed">
            Al continuar, aceptas nuestras políticas de uso.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormRefactored;
