"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import ImageCarousel from "./ImageCarousel";
import FormHeader from "../molecules/FormHeader";
import LoginFields from "../molecules/LoginFields";
import RegisterFields from "../molecules/RegisterFields";
import SubmitButton from "../molecules/SubmitButton";
import SocialLoginButtons from "../molecules/SocialLoginButtons";
import LocationSelector from "../molecules/LocationSelector";
import FormToggle from "../molecules/FormToggle";
import ErrorMessage from "../atoms/ErrorMessage";
import Logo from "../molecules/Logo";

const AuthFormRefactored: React.FC = () => {
  const { login, register, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Colombia");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (isLogin) {
        await login({ email, contrasena: password });
        router.push("/"); 
      } else {
        if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden");
          return;
        }

        if (!firstName || !lastName || !email || !password) {
          alert("Por favor completa todos los campos obligatorios");
          return;
        }

        await register({
          nombre: firstName,
          apellido: lastName,
          email,
          contrasena: password,
          telefono: phone,
          rol: 1,
        });

        router.push("/");
      }
    } catch (error: any) {
      console.error("❌ Error en autenticación:", error.message || error);
    }
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    clearError();
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setAddress("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        // Sin acción, pero evita cierres inesperados
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* 🔝 Header */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="text-sm font-medium">
              Descargar la app de AliExpress
            </span>
          </div>
        </div>
      </div>

      {/* 🖼️ Carousel */}
      <div className="hidden lg:flex lg:w-2/3 relative mt-16">
        <ImageCarousel />
      </div>

      {/* 🧾 Formulario */}
      <div className="w-full lg:w-1/3 bg-white flex items-center justify-center p-8 mt-16">
        <div className="w-full max-w-md">
          <FormHeader isLogin={isLogin} />
          <ErrorMessage message={error || ""} />

          <form onSubmit={handleSubmit} className="space-y-4">
            {isLogin ? (
              <LoginFields
                email={email}
                password={password}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              <RegisterFields
                firstName={firstName}
                lastName={lastName}
                email={email}
                phone={phone}
                address={address}
                password={password}
                confirmPassword={confirmPassword}
                onFirstNameChange={(e) => setFirstName(e.target.value)}
                onLastNameChange={(e) => setLastName(e.target.value)}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPhoneChange={(e) => setPhone(e.target.value)}
                onAddressChange={(e) => setAddress(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onConfirmPasswordChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
            )}

            <SubmitButton isLogin={isLogin} isLoading={isLoading} />
          </form>

          <div className="text-center mt-4">
            <a
              href="#"
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              ¿Tienes problemas al iniciar sesión?
            </a>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Acceso rápido con
              </span>
            </div>
          </div>

          <SocialLoginButtons />

          <LocationSelector
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
          />

          <div className="mt-6 text-xs text-gray-500 leading-relaxed">
            Al continuar, confirmas ser mayor de edad y aceptas nuestro
            Acuerdo de Membresía Gratuita y Políticas de Privacidad. Tu
            información podrá utilizarse con fines promocionales, pero puedes
            rechazarlo en cualquier momento.
          </div>

          <div className="text-center mt-4">
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              ¿Por qué escoger una ubicación?
            </a>
          </div>

          <FormToggle isLogin={isLogin} onToggle={toggleMode} />
        </div>
      </div>
    </div>
  );
};

export default AuthFormRefactored;
