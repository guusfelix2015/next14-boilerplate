import { get } from "lodash";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { z, ZodSchema } from "zod";

import { cn } from "@/utils";

import { FormError } from "./form-error";
import { Input } from "./input";
import { Label } from "./label";

interface InputFieldProps<T extends ZodSchema>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
  name: Path<z.infer<T>>;
  register: UseFormRegister<z.infer<T>>;
  errors: FieldErrors<z.infer<T>>;
  placeholder?: string;
  disabled?: boolean;
}

export function InputField<T extends ZodSchema>({
  type,
  label,
  name,
  register,
  errors,
  placeholder,
  disabled,
  ...props
}: InputFieldProps<T>) {
  const inputId = `input-${name}`;
  const fieldError = get(errors, name);
  const hasError = Boolean(fieldError);

  return (
    <div>
      <div className="flex flex-col gap-2">
        {label && (
          <Label
            className={cn(
              hasError ? "text-destructive" : "",
              disabled ? "text-gray-400" : ""
            )}
            htmlFor={inputId}
          >
            {label}
          </Label>
        )}
        <Input
          className={cn(hasError ? "border-destructive" : "")}
          disabled={disabled}
          id={inputId}
          {...register(name)}
          hasError={hasError}
          placeholder={placeholder}
          type={type}
          {...props}
        />
      </div>
      <FormError errors={errors} fieldName={name} />
    </div>
  );
}
