import { cn } from "@/utils";
import * as React from "react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, hasError, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "placeholder:text-placeholder flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    {
                        "focus-visible:ring-2 focus-visible:ring-ring":
                            !hasError,
                        "border-destructive focus-visible:ring-0": hasError,
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
