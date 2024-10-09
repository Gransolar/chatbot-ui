const handleSSOLogin = async () => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.auth.signInWithSSO({
      domain: 'gransolar.com'
    })

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
