import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { ZodSchema, z } from "zod";

export interface InputCEPProps<T extends ZodSchema> {
    type: string;
    label?: string;
    name: Path<z.infer<T>>;
    register: UseFormRegister<z.infer<T>>;
    errors: FieldErrors<z.infer<T>>;
    placeholder?: string;
    handleCEPChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    className?: string;
}
