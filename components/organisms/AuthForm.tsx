"use client";

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import ImageCarousel from "./ImageCarousel";
import FormHeader from "../molecules/FormHeader";
import LoginFields from "../molecules/LoginFields";
import SubmitButton from "../molecules/SubmitButton";
import LocationSelector from "../molecules/LocationSelector";
import Logo from "../molecules/Logo";

const AuthFormRefactored: React.FC = () => {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Colombia");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

      try {
      const loggedUser = await login(email, password);

      if (!loggedUser) {
        setErrorMessage("Credenciales inválidas o error de conexión.");
        return;
      }

      const roleNumber = Number(loggedUser.rol);
      if (Number.isNaN(roleNumber) || roleNumber !== 2) {
        setErrorMessage("Solo los vendedores pueden iniciar sesión en esta sección.");
        return;
      }

      router.replace("/cuenta");
    } catch (err: any) {
      console.error("Error en login:", err);
      setErrorMessage(err.message || "Error al iniciar sesión");
    }
  };

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
          <FormHeader isLogin={true} />

          {errorMessage && (
            <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <LoginFields
              email={email}
              password={password}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
            />

            <SubmitButton isLogin={true} isLoading={loading} />
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

export default AuthFormRefactored;