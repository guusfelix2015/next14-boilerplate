import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { z, ZodSchema } from "zod";

import { InputField } from "../InputField";

interface InputDocumentProps<T extends ZodSchema> {
  type: string;
  label?: string;
  name: Path<z.infer<T>>;
  register: UseFormRegister<z.infer<T>>;
  errors: FieldErrors<z.infer<T>>;
  placeholder?: string;
  handleDocumentChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function DocumentInput<T extends ZodSchema>({
  type,
  label,
  name,
  register,
  errors,
  placeholder,
  handleDocumentChange,
  disabled,
}: InputDocumentProps<T>) {
  return (
    <InputField
      disabled={disabled}
      errors={errors}
      label={label}
      name={name}
      placeholder={placeholder}
      register={register}
      type={type}
      onChange={handleDocumentChange}
    />
  );
}
