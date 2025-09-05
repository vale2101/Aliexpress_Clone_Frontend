"use client";

import React, { useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import ImageCarousel from "../molecules/ImageCarousel";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthForm() {
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
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("United States");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      if (isLogin) {
        // Lógica de login
        await login({ email, contrasena: password });
        router.push('/'); // Redirigir al home después del login
      } else {
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
          alert('Las contraseñas no coinciden');
          return;
        }
        
        // Lógica de registro
        await register({
          nombre: firstName,
          apellido: lastName,
          email,
          contrasena: password,
          telefono: phone,
          rol: 1, // Rol de usuario por defecto
          estado: 'activo'
        });
        router.push('/'); // Redirigir al home después del registro
      }
    } catch (error: any) {
      console.error('Error en autenticación:', error);
      // El error se maneja automáticamente en el contexto
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Limpiar campos al cambiar modo
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setAddress("");
  };

  // Cerrar dropdowns al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setShowMoreOptions(false);
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Header superior */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo AliExpress */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-orange-500">Ali</span>
              <span className="text-black">Express</span>
            </span>
          </div>
          
          {/* Download App */}
          <div className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-sm font-medium">Download the AliExpress app</span>
          </div>
        </div>
      </div>

      {/* Sección izquierda - Promocional con Carrusel */}
      <div className="hidden lg:flex lg:w-2/3 relative mt-16">
        <ImageCarousel />
      </div>

      {/* Sección derecha - Formulario */}
      <div className="w-full lg:w-1/3 bg-white flex items-center justify-center p-8 mt-16">
        <div className="w-full max-w-md">
          {/* Header del formulario */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? "Inicia sesión" : "Regístrate"}
            </h1>
            <div className="flex items-center justify-center text-green-600 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Tu información está protegida
            </div>
          </div>

          {/* Mostrar errores */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                {/* Campos de registro */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Nombre"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Apellido"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="Número de teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {isLogin && (
              <>
                {/* Campos de login */}
                <div>
                  <Input
                    type="email"
                    placeholder="Email o número de teléfono"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-400 hover:bg-pink-500 disabled:bg-pink-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? "Iniciando sesión..." : "Registrando..."}
                </div>
              ) : (
                isLogin ? "Iniciar sesión" : "Registrarse"
              )}
            </Button>
          </form>

          {/* Enlaces de ayuda */}
          <div className="text-center mt-4">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
              ¿Tienes problemas al iniciar sesión?
            </a>
          </div>

          {/* Separador */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Acceso rápido con</span>
            </div>
          </div>

          {/* Botones de redes sociales */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            <button
              type="button"
              className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>

            <button
              type="button"
              className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-3" fill="#000000" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Más opciones / Twitter */}
          <div className="text-center mt-4">
            {!showMoreOptions ? (
              <button 
                type="button"
                onClick={() => setShowMoreOptions(true)}
                className="text-gray-500 text-sm hover:text-gray-700 flex items-center justify-center mx-auto"
              >
                Más opciones
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => setShowMoreOptions(false)}
                className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" fill="#000000" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter
              </button>
            )}
          </div>

          {/* Selector de ubicación */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg relative dropdown-container">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Localización:</span>
              <button 
                type="button"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center text-sm text-gray-700 hover:text-gray-900"
              >
                {selectedLocation}
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {/* Dropdown de ubicación */}
            {showLocationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="max-h-48 overflow-y-auto">
                  {[
                    "United States", "España", "México", "Colombia", "Argentina", 
                    "Chile", "Perú", "Venezuela", "Ecuador", "Uruguay", "Paraguay"
                  ].map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(location);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        selectedLocation === location ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Texto legal */}
          <div className="mt-6 text-xs text-gray-500 leading-relaxed">
            Al continuar, confirmas ser mayor de edad y aceptas nuestro Acuerdo de Membresía Gratuita de AliExpress y Políticas de Privacidad. Tu información podrá utilizarse con fines promocionales, pero puedes rechazarlo en cualquier momento.
          </div>

          <div className="text-center mt-4">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
              ¿Por qué escoger una ubicación?
            </a>
          </div>

          {/* Toggle entre login y registro */}
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={toggleMode}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
