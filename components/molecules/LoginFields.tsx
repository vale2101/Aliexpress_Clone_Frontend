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
          type="email"
          placeholder="Email o número de teléfono"
          value={email}
          onChange={onEmailChange}
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <div>
        <FormField
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={onPasswordChange}
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>
    </>
  );
};

export default LoginFields;
