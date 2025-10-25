"use client";

import React from "react";

interface RegisterFieldsProps {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  contrasena: string;
  confirmarContrasena: string;
  onChange: (field: string, value: string) => void;
}

const RegisterFields: React.FC<RegisterFieldsProps> = ({
  nombre,
  apellido,
  email,
  telefono,
  contrasena,
  confirmarContrasena,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => onChange("nombre", e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => onChange("apellido", e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => onChange("email", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <input
        type="tel"
        placeholder="Número de teléfono"
        value={telefono}
        onChange={(e) => onChange("telefono", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => onChange("contrasena", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmarContrasena}
        onChange={(e) => onChange("confirmarContrasena", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </div>
  );
};

export default RegisterFields;
