import React from 'react';
import { signInWithSSO } from '../path/to/client';

const LoginButton = () => {
  const handleLogin = async () => {
    const isSuccess = await signInWithSSO();
    if (isSuccess) {
      console.log('Redirigiendo al proveedor de SSO...');
    }
  };

  return (
    <button onClick={handleLogin} className="login-button">
      Iniciar sesión con SSO
    </button>
  );
};

export default LoginButton;
