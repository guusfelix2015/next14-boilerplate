import { get } from "lodash";
import { Control, Controller, FieldErrors, Path } from "react-hook-form";
import { z, ZodSchema } from "zod";

import { formatToPhone } from "@/utils";

import { FormError } from "../FormError";
import { Input } from "../Input";
import { Label } from "../Label";

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
            className={hasError ? "text-destructive" : ""}
            htmlFor={inputId}
          >
            {label}
          </Label>
        )}
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <Input
              className={hasError ? "border-destructive" : ""}
              hasError={hasError}
              id={`input-${name}`}
              placeholder={placeholder}
              type={type}
              value={value ?? ""}
              onChange={e => {
                const watchPhone = e.target.value;
                if (!watchPhone) return;
                const formattedPhone = formatToPhone(watchPhone);
                onChange(formattedPhone);
              }}
            />
          )}
        />
      </div>
      <FormError errors={errors} fieldName={name} />
    </div>
  );
}
