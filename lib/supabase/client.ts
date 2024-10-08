import { createBrowserClient } from "@supabase/ssr"

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// Método para iniciar sesión con SSO
export const signInWithSSO = async () => {
  const { error } = await supabase.auth.signInWithSSO({
    domain: 'gransolar.com', // Reemplaza con tu dominio
  });

  if (error) {
    console.error('Error en el inicio de sesión SSO:', error);
    return false;
  }

  return true;
};
