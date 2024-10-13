import { InputField } from "../InputField";
import { InputCEPProps } from "@/src/types";
import { ZodSchema } from "zod";

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
            data-testid="cep-input"
            disabled={disabled}
            type={type}
            label={label}
            name={name}
            register={register}
            errors={errors}
            onChange={handleCEPChange}
            placeholder={placeholder}
            className={className}
            maxLength={9}
        />
    );
}
