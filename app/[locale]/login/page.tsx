"use client"

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { useState } from 'react'

export default function Login() {
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSSOLogin = async (e) => {
    e.preventDefault() // Evita que el formulario recargue la página

    const supabase = createClient()

    try {
      const { data, error } = await supabase.auth.signInWithSSO({
        domain: 'gransolar.com' // Dominio autorizado configurado en Supabase SAML
      })

      if (data?.url) {
        // redirect the user to the identity provider's authentication flow
        window.location.href = data.url
      }

      if (error) {
        setError(error.message) // Muestra el mensaje de error si hay uno
        return
      }

      // Si el inicio de sesión SSO es exitoso, redirigir al dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("SSO Login Error:", err)
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Login with SSO</h1>
      </div>

      <form onSubmit={handleSSOLogin}>
        <button
          type="submit"
          className="mb-6 w-full rounded-md bg-blue-700 px-4 py-2 text-white"
        >
          Sign in with SSO
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
