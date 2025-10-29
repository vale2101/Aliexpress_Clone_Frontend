"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../molecules/Logo";
import LoginFields from "../molecules/LoginFields";
import LocationSelector from "../molecules/LocationSelector";
import VendedorCarousel from "../molecules/VendedorCarousel";

export default function VendedorLogin() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("Colombia");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Por favor ingresa correo y contraseña.");
      return;
    }

    try {
      const user = await login(email, password);

      if (!user) {
        setErrorMessage("Credenciales inválidas o error de conexión.");
        return;
      }

      if (Number(user.rol) !== 3) {
        setErrorMessage("Solo los usuarios con rol 3 pueden iniciar sesión en esta sección.");
        return;
      }

      router.push("/cuenta/pedidos");
    } catch (err: any) {
      setErrorMessage(err?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-lg px-8 py-24">
          <Logo />

          <h1 className="text-4xl font-extrabold text-gray-900 mt-6">
            Bienvenido a <br />
            <span>Centro de Ventas Global</span>
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Introduzca sus detalles a continuación
          </p>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <LoginFields
              email={email}
              password={password}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <a className="text-sm text-gray-600 hover:underline" href="#">
                Olvidó la contraseña
              </a>
              <LocationSelector
                selectedLocation={location}
                onLocationChange={setLocation}
              />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#5b21b6] via-[#06b6d4] to-[#f43f5e]"
              >
                {loading ? "Cargando..." : "Firmar en"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/registroV")}
                className="px-6 py-3 rounded-full border border-gray-300 bg-white hover:shadow"
              >
                Registro
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative">
        <VendedorCarousel />
      </div>
    </div>
  );
}