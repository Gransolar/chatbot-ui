import { Brand } from "@/components/ui/brand"
import { createClient } from "@/lib/supabase/server"
import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { get } from "@vercel/edge-config"
import { Metadata } from "next"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Login"
}

export default async function Login({
  searchParams
}: {
  searchParams: { message: string }
}) {
  const cookieStore = cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
  const session = (await supabase.auth.getSession()).data.session

  if (session) {
    const { data: homeWorkspace, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("is_home", true)
      .single()

    if (!homeWorkspace) {
      throw new Error(error.message)
    }

    return redirect(`/${homeWorkspace.id}/chat`)
  }

  const handleSSOLogin = async () => {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signInWithSSO({
      domain: "gransolar.com"
    })

    if (data?.url) {
      // redirect the user to the identity provider's authentication flow
      window.location.href = data.url
    }

    if (error) {
      console.error("Error during SSO login:", error)
      return redirect(`/login?message=${error.message}`)
    }

    // Redirigir después de iniciar sesión con SSO
    return redirect("/dashboard")
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <div className="mb-4 text-center">
        <Brand />
        <h1 className="text-2xl font-bold">Login</h1>
      </div>

      <form action={handleSSOLogin}>
        <button
          type="submit"
          className="mb-6 w-full rounded-md bg-blue-700 px-4 py-2 text-white"
        >
          Sign in with SSO
        </button>
      </form>
    </div>
  )
}
