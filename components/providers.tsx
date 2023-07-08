"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { pb } from "@/lib/pocketbase"
import { ThemeProvider } from "@/components/theme-provider"

import { useUserStore } from "./store/userStore"

export default function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          structuralSharing: false,
          refetchOnWindowFocus: false,
        },
      },
    })
  )

  const { user, setUser, clear } = useUserStore()

  React.useEffect(() => {
    setUser(pb.authStore.model)

    const authUnsubscribe = pb.authStore.onChange((token, model) => {
      // console.log("Auth Listener Triggered", token, model)
      if (model) setUser(model)
      else clear()
    })

    return () => authUnsubscribe()
  }, [clear, setUser])

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
