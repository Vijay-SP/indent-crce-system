import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export default function LoadingAlert({ className }: { className?: string }) {
  return (
    <Alert className={cn("flex flex-col items-center py-12", className)}>
      <figure>
        <Icons.loader className="h-10 w-10 animate-spin" />
      </figure>
      <AlertTitle className="mt-3 text-2xl font-semibold">Loading</AlertTitle>
      <AlertDescription>Please wait a moment...</AlertDescription>
    </Alert>
  )
}
