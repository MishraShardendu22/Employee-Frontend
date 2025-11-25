import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-[#0047AB] dark:bg-[#3C8DFF] text-white hover:bg-[#003B8F] dark:hover:bg-[#3378D6] focus-visible:ring-[#0047AB]/50 dark:focus-visible:ring-[#3C8DFF]/50",
        destructive:
          "bg-[#DC3545] dark:bg-[#FF4D4D] text-white hover:bg-[#C82333] dark:hover:bg-[#E53E3E] focus-visible:ring-[#DC3545]/50 dark:focus-visible:ring-[#FF4D4D]/50",
        outline:
          "border-2 border-[#E0E6ED] dark:border-[#2B2F36] bg-white dark:bg-[#161B22] text-[#0D0D0D] dark:text-[#F1F1F1] shadow-xs hover:bg-[#F5F7FA] dark:hover:bg-[#21262D] hover:border-[#0047AB] dark:hover:border-[#3C8DFF]",
        secondary:
          "bg-[#1E90FF] dark:bg-[#1B6FD1] text-white hover:bg-[#1A7FE5] dark:hover:bg-[#175BB0]",
        ghost:
          "hover:bg-[#F5F7FA] dark:hover:bg-[#21262D] text-[#0D0D0D] dark:text-[#F1F1F1]",
        link: "text-[#0047AB] dark:text-[#3C8DFF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
