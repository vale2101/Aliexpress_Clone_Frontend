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
      {/* Campos de registro */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormField
            type="text"
            placeholder="Nombre"
            value={firstName}
            onChange={onFirstNameChange}
            required
          />
        </div>
        <div>
          <FormField
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={onLastNameChange}
            required
          />
        </div>
      </div>

      <div>
        <FormField
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          required
        />
      </div>

      <div>
        <FormField
          type="tel"
          placeholder="Número de teléfono"
          value={phone}
          onChange={onPhoneChange}
          required
        />
      </div>

      <div>
        <FormField
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={onAddressChange}
          required
        />
      </div>

      <div>
        <FormField
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>

      <div>
        <FormField
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          required
        />
      </div>
    </>
  );
};

export default RegisterFields;
