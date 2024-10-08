// /pages/login.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "../client"; // Importa tu cliente de Supabase

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Inicia sesión con SSO (SAML)
    const signInWithSSO = async () => {
      const { error } = await supabase.auth.signInWithSSO({
        provider: "saml",
      });

      if (error) {
        console.error("Error en el inicio de sesión SSO:", error);
      } else {
        console.log("Redirigiendo a la autenticación...");
      }
    };

    signInWithSSO();
  }, []);

  return <div>Redirigiendo al proveedor de inicio de sesión...</div>;
};

export default LoginPage;
