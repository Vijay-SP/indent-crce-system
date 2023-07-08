"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { useUserStore } from "@/components/store/userStore"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user } = useUserStore()

  React.useEffect(() => {
    if (user) router.replace("/")
  }, [router, user])

  return <>{children}</>
}
