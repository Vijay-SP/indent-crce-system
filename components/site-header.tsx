"use client"

import Link from "next/link"
import { ExitIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { pb } from "@/lib/pocketbase"
import { MainNav, MobileMainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Icons } from "./icons"
import { useUserStore } from "./store/userStore"
import { Button, buttonVariants } from "./ui/button"

export function SiteHeader() {
  const { user } = useUserStore()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MobileMainNav />
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            {user && (
              <Button
                size="icon"
                onClick={() => {
                  pb.collection("users").update(user.id, {
                    is_logged_in: true,
                  })
                  pb.authStore.clear()
                }}
              >
                <ExitIcon />
              </Button>
            )}
            {!user && (
              <Link href="/login" className={buttonVariants()}>
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
