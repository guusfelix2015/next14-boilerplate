import { formatToPhone } from "@/utils";
import { get } from "lodash";
import { Controller, Control, FieldErrors, Path } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { Label } from "../Label";
import { Input } from "../Input";
import { FormError } from "../FormError";

interface PhoneInputFieldProps<T extends ZodSchema> {
    type: string;
    label?: string;
    name: Path<z.infer<T>>;
    control: Control<z.infer<T>>;
    errors: FieldErrors<z.infer<T>>;
    placeholder?: string;
}

export function PhoneInputField<T extends ZodSchema>({
    type,
    label,
    name,
    control,
    errors,
    placeholder,
}: PhoneInputFieldProps<T>) {
    const inputId = `input-${name}`;
    const fieldError = get(errors, name);
    const hasError = Boolean(fieldError);

    return (
        <div>
            <div className="flex flex-col gap-2">
                {label && (
                    <Label
                        htmlFor={inputId}
                        className={hasError ? "text-destructive" : ""}
                    >
                        {label}
                    </Label>
                )}
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            id={`input-${name}`}
                            hasError={hasError}
                            className={hasError ? "border-destructive" : ""}
                            value={value ?? ""}
                            onChange={e => {
                                const watchPhone = e.target.value;
                                if (!watchPhone) return;
                                const formattedPhone =
                                    formatToPhone(watchPhone);
                                onChange(formattedPhone);
                            }}
                            placeholder={placeholder}
                            type={type}
                        />
                    )}
                />
            </div>
            <FormError errors={errors} fieldName={name} />
        </div>
    );
}
