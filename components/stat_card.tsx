import { UseQueryResult } from "@tanstack/react-query"
import { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export function StatQueryCard({
  title,
  icon: Icon,
  statQuery,
  children,
}: {
  title: string
  icon: LucideIcon
  statQuery: UseQueryResult
  children?: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {statQuery.isLoading && <Icons.loader className="animate-spin" />}
          {!statQuery.isLoading &&
            !statQuery.isError &&
            statQuery.data instanceof Array &&
            statQuery.data.length}
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

export function StatCard({
  title,
  icon: Icon,
  isLoading,
  stat,
  children,
}: {
  title: string
  icon: LucideIcon
  isLoading?: boolean
  stat: string | number
  children?: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading && <Icons.loader className="animate-spin" />}
          {!isLoading && stat}
        </div>
        {children}
      </CardContent>
    </Card>
  )
}
