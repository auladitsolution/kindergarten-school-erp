import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-purple-100 text-purple-700 hover:bg-purple-200",
        purple: "border-transparent bg-purple-100 text-purple-700 hover:bg-purple-200",
        sky: "border-transparent bg-sky-100 text-sky-700 hover:bg-sky-200",
        yellow: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200",
        pink: "border-transparent bg-rose-100 text-rose-700 hover:bg-rose-200",
        green: "border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
        orange: "border-transparent bg-orange-100 text-orange-700 hover:bg-orange-200",
        outline: "text-slate-700 border border-slate-200 bg-white",
        destructive: "border-transparent bg-red-100 text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
