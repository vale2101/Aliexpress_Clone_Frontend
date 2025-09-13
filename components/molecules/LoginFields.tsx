import React from 'react';
import FormField from '../atoms/FormField';

interface LoginFieldsProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginFields: React.FC<LoginFieldsProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange
}) => {
  return (
    <>
      <div>
        <FormField
          label="Correo electrónico o número de teléfono"
          type="email"
          placeholder="Introduce tu correo o teléfono"
          value={email}
          onChange={onEmailChange}
          required
          className="w-full"
        />
      </div>

      <div className="mt-4">
        <FormField
          label="Contraseña"
          type="password"
          placeholder="Introduce tu contraseña"
          value={password}
          onChange={onPasswordChange}
          required
          className="w-full"
        />
      </div>
    </>
  );
};

export default LoginFields;
