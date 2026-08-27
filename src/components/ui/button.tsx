import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#5865F2] text-white hover:bg-[#4752C4] shadow-sm",
        destructive: "bg-[#DA373C] text-white hover:bg-[#A12828] shadow-sm",
        outline: "border border-[#3F4147] bg-transparent hover:bg-[#35373C] text-zinc-200",
        secondary: "bg-[#35373C] text-zinc-200 hover:bg-[#404249]",
        ghost: "hover:bg-[#35373C] text-zinc-300 hover:text-white",
        link: "text-[#00A8FC] underline-offset-4 hover:underline",
        primary: "bg-[#23A55A] text-white hover:bg-[#1C8B4C]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
    VariantProps<typeof buttonVariants> {}

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
