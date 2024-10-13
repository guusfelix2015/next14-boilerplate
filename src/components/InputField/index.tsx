import { cn } from "@/utils";
import { get } from "lodash";
import { FieldErrors, UseFormRegister, Path } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { Label } from "../Label";
import { Input } from "../Input";
import { FormError } from "../FormError";

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
                        htmlFor={inputId}
                        className={cn(
                            hasError ? "text-destructive" : "",
                            disabled ? "text-gray-400" : ""
                        )}
                    >
                        {label}
                    </Label>
                )}
                <Input
                    disabled={disabled}
                    id={inputId}
                    className={cn(hasError ? "border-destructive" : "")}
                    {...register(name)}
                    placeholder={placeholder}
                    type={type}
                    hasError={hasError}
                    {...props}
                />
            </div>
            <FormError errors={errors} fieldName={name} />
        </div>
    );
}
