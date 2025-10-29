import React from 'react';
import FormField from '../atoms/FormField';
import Input from '../atoms/Input';

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
          required
        >
          <Input
            type="email"
            placeholder="Introduce tu correo o teléfono"
            value={email}
            onChange={onEmailChange}
            className="w-full"
          />
        </FormField>
      </div>

      <div className="mt-4">
        <FormField
          label="Contraseña"
          required
        >
          <Input
            type="password"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={onPasswordChange}
            className="w-full"
          />
        </FormField>
      </div>
    </>
  );
};

export default LoginFields;
