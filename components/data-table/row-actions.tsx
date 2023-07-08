"use client"

import Link from "next/link"
import { Row } from "@tanstack/react-table"
import { LucideIcon, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  options: {
    icon: LucideIcon
    title: string
    href?: string
    action?: () => void
  }[]
}

export function DataTableRowActions<TData>({
  row,
  options,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {options.map((o) =>
          !!o.href ? (
            <DropdownMenuItem asChild key={o.title}>
              <Link href={o.href}>
                <o.icon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                {o.title}
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={o.action} key={o.title}>
              <o.icon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              {o.title}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
