import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { ZodSchema, z } from "zod";
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
            type={type}
            label={label}
            name={name}
            register={register}
            errors={errors}
            onChange={handleDocumentChange}
            placeholder={placeholder}
        />
    );
}
