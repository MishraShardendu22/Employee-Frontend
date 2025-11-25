import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-[#6C757D] dark:placeholder:text-[#7A7F87] selection:bg-primary selection:text-primary-foreground bg-white dark:bg-[#161B22] border-[#E0E6ED] dark:border-[#2B2F36] text-[#0D0D0D] dark:text-[#F1F1F1] h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[#0047AB] dark:focus-visible:border-[#3C8DFF] focus-visible:ring-[#0047AB]/50 dark:focus-visible:ring-[#3C8DFF]/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
