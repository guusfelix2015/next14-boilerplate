import { ZodSchema } from "zod";

import { InputCEPProps } from "@/types";

import { InputField } from "./input-field";

export function CEPInput<T extends ZodSchema>({
  type,
  label,
  name,
  register,
  errors,
  placeholder,
  handleCEPChange,
  disabled,
  className,
}: InputCEPProps<T>) {
  return (
    <InputField
      className={className}
      data-testid="cep-input"
      disabled={disabled}
      errors={errors}
      label={label}
      maxLength={9}
      name={name}
      placeholder={placeholder}
      register={register}
      type={type}
      onChange={handleCEPChange}
    />
  );
}
