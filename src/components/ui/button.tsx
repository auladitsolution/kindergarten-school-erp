import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200 hover:shadow-md",
        sky:
          "bg-sky-400 text-white hover:bg-sky-500 shadow-sky-200 hover:shadow-md",
        yellow:
          "bg-amber-400 text-slate-900 hover:bg-amber-500 shadow-amber-200 hover:shadow-md",
        pink:
          "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200 hover:shadow-md",
        green:
          "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200 hover:shadow-md",
        outline:
          "border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800",
        ghost:
          "hover:bg-purple-50 text-slate-700 hover:text-purple-700 shadow-none",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-red-200 hover:shadow-md",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-xl px-3.5 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base font-bold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
