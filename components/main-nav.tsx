"use client"

import React from "react"
import Link from "next/link"
import { PanelLeftOpen } from "lucide-react"
import { Admin, Record } from "pocketbase"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { useUserStore } from "./store/userStore"
import { ScrollArea } from "./ui/scroll-area"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"

export function NavBranding({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Icons.logo className="h-full max-h-[50px] w-full" />
      {/* <span className="inline-block font-bold">{siteConfig.name}</span> */}
    </Link>
  )
}

export function MobileMainNav() {
  const [open, setOpen] = React.useState(false)
  const { user } = useUserStore()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="mr-4 lg:hidden">
          <PanelLeftOpen />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle className="flex items-center justify-center gap-2">
          <NavBranding />
        </SheetTitle>
        <ScrollArea className="my-6">
          <div className="flex flex-col gap-2">
            {siteConfig.mainNav.map(
              (item) =>
                item.href && (
                  <Link
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                      }),
                      "w-full justify-start"
                    )}
                    key={item.href}
                    href={item.href}
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.title}
                  </Link>
                )
            )}
            {user instanceof Admin &&
              siteConfig.adminNav.map(
                (item, index) =>
                  item.href && (
                    <Link
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "w-full justify-start"
                      )}
                      key={item.href}
                      href={item.href}
                    >
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.title}
                    </Link>
                  )
              )}
            {user instanceof Record &&
              siteConfig.userNav.map(
                (item, index) =>
                  item.href && (
                    <Link
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "w-full justify-start"
                      )}
                      key={item.href}
                      href={item.href}
                    >
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.title}
                    </Link>
                  )
              )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export function MainNav() {
  const { user } = useUserStore()

  return (
    <div className="hidden gap-6 md:flex md:gap-10">
      <NavBranding />
      {siteConfig.mainNav?.length ? (
        <nav className="flex gap-6">
          {siteConfig.mainNav.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "hidden items-center text-sm font-medium text-muted-foreground lg:flex"
                    // item?.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
          {user instanceof Admin &&
            siteConfig.adminNav.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "hidden items-center text-sm font-medium text-muted-foreground lg:flex"
                      // item?.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          {user instanceof Record &&
            siteConfig.userNav.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "hidden items-center text-sm font-medium text-muted-foreground lg:flex"
                      // item?.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
        </nav>
      ) : null}
    </div>
  )
}
