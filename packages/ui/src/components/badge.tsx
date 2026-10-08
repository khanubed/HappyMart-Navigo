import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "text-foreground border border-border",
        accent:
          "border-transparent bg-accent text-accent-foreground font-bold",
        success:
          "border-transparent bg-success text-success-foreground",
        warning:
          "border-transparent bg-warning text-warning-foreground font-medium",
        veg:
          "border border-success/40 bg-success/10 text-success dark:bg-success/20",
        "non-veg":
          "border border-destructive/40 bg-destructive/10 text-destructive dark:bg-destructive/20",
        halal:
          "border border-primary/40 bg-primary/10 text-primary dark:bg-primary/20",
        offer:
          "border-transparent bg-accent text-accent-foreground font-bold tracking-wide",
        lowStock:
          "border border-warning/40 bg-warning/10 text-warning dark:bg-warning/20",
        outOfStock:
          "border border-muted-foreground/30 bg-muted text-muted-foreground",
      },
      size: {
        default: "text-xs px-2.5 py-0.5",
        sm: "text-[10px] px-1.5 py-0.2",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  indicator?: "dot" | "none"
}

function Badge({ className, variant, size, indicator = "none", children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {(indicator === "dot" || variant === "veg" || variant === "non-veg") && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            variant === "veg"
              ? "bg-success"
              : variant === "non-veg"
              ? "bg-destructive"
              : "bg-current"
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
