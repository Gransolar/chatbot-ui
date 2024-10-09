"use client"

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { useState } from 'react'

export default function Login() {
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSSOLogin = async () => {
    const supabase = createClient()
    try {
      const { data, error } = await supabase.auth.signInWithSSO({
        domain: 'gransolar.com'
      })

      if (data?.url) {
        // redirect the user to the identity provider's authentication flow
        window.location.href = data.url
      }

      if (error) {
        console.error("Error SSO:", error.message)
        return
      }

      // Aquí deberías obtener el ID del workspace una vez la autenticación sea exitosa
      const session = await supabase.auth.getSession()

      if (session?.data?.session) {
        const { user } = session.data.session

        // Buscar el workspace correspondiente al usuario autenticado
        const { data: homeWorkspace, error: homeWorkspaceError } = await supabase
          .from("workspaces")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_home", true)
          .single()

        if (homeWorkspaceError || !homeWorkspace) {
          console.error("Error obteniendo el workspace:", homeWorkspaceError?.message)
          throw new Error(homeWorkspaceError?.message || "No se pudo obtener el workspace.")
        }

        // Redirigir al workspace correcto
        window.location.href = `/${homeWorkspace.id}/chat`
      } else {
        console.error("Error obteniendo la sesión.")
      }
    } catch (err) {
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
