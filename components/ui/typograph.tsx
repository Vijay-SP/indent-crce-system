import { cn } from "@/lib/utils"

interface HeadingProps {
  className?: string
  children: React.ReactNode
}

export function Heading1({ className, children }: HeadingProps) {
  return (
    <h1
      className={cn(
        "mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  )
}
