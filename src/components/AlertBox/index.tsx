import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/utils";

const alertBoxVariants = cva("flex items-start p-4 rounded-md text-sm", {
  variants: {
    variant: {
      primary: "bg-violet-50 text-violet-950",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface AlertBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertBoxVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const AlertBox: React.FC<AlertBoxProps> = ({
  className,
  variant,
  title,
  description,
  icon,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(alertBoxVariants({ variant }), className)}
      role="alert"
      {...props}
    >
      {icon && <div className="mr-3">{icon}</div>}
      <div>
        {title && <div className="font-medium leading-5">{title}</div>}
        {description && <div className="mt-1 leading-5">{description}</div>}
        {children}
      </div>
    </div>
  );
};

export { AlertBox, alertBoxVariants };
