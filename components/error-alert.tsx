import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export default function ErrorAlert({
  title,
  description,
  className,
}: {
  title?: string
  description?: string
  className?: string
}) {
  return (
    <Alert
      variant="destructive"
      className={cn(
        "flex flex-col items-center px-24 py-12 md:py-24",
        className
      )}
    >
      <figure>
        <Icons.alert className="h-10 w-10 md:h-20 md:w-20" />
      </figure>
      <AlertTitle className="mt-3 text-2xl font-semibold md:mt-6 md:text-4xl">
        {title ? title : "Error"}
      </AlertTitle>
      {description && (
        <AlertDescription className="text-center">
          {description}
        </AlertDescription>
      )}
    </Alert>
  )
}
