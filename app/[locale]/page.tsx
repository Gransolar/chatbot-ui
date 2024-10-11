"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir automáticamente al login cuando se cargue la página
    router.push("/setup")
  }, [router])

  return null // No se muestra nada porque se redirige automáticamente
}
