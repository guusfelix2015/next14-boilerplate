import { FieldErrors, Control, Path } from "react-hook-form";
import { ZodSchema, z } from "zod";

export interface DatePickerInputFieldProps<T extends ZodSchema> {
    label?: string;
    name: Path<z.infer<T>>;
    control: Control<z.infer<T>>;
    errors: FieldErrors<z.infer<T>>;
    disabled?: boolean;
}
