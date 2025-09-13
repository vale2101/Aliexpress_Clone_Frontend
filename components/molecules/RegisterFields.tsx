import React from 'react';
import FormField from '../atoms/FormField';

interface RegisterFieldsProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterFields: React.FC<RegisterFieldsProps> = ({
  firstName,
  lastName,
  email,
  phone,
  address,
  password,
  confirmPassword,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
  onAddressChange,
  onPasswordChange,
  onConfirmPasswordChange
}) => {
  return (
    <>
      {/* Nombre y Apellido */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormField
            label="Nombre"
            type="text"
            placeholder="Introduce tu nombre"
            value={firstName}
            onChange={onFirstNameChange}
            required
          />
        </div>
        <div>
          <FormField
            label="Apellido"
            type="text"
            placeholder="Introduce tu apellido"
            value={lastName}
            onChange={onLastNameChange}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <FormField
          label="Correo electrónico"
          type="email"
          placeholder="Introduce tu correo"
          value={email}
          onChange={onEmailChange}
          required
        />
      </div>

      {/* Teléfono */}
      <div>
        <FormField
          label="Número de teléfono"
          type="tel"
          placeholder="Introduce tu número de teléfono"
          value={phone}
          onChange={onPhoneChange}
          required
        />
      </div>

      {/* Dirección */}
      <div>
        <FormField
          label="Dirección"
          type="text"
          placeholder="Introduce tu dirección"
          value={address}
          onChange={onAddressChange}
          required
        />
      </div>

      {/* Contraseña */}
      <div>
        <FormField
          label="Contraseña"
          type="password"
          placeholder="Introduce tu contraseña"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>

      {/* Confirmar contraseña */}
      <div>
        <FormField
          label="Confirmar contraseña"
          type="password"
          placeholder="Vuelve a escribir tu contraseña"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          required
        />
      </div>
    </>
  );
};

export default RegisterFields;
