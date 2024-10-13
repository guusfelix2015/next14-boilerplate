import { Control, FieldErrors, Path } from "react-hook-form";
import { z, ZodSchema } from "zod";

export interface DatePickerInputFieldProps<T extends ZodSchema> {
  label?: string;
  name: Path<z.infer<T>>;
  control: Control<z.infer<T>>;
  errors: FieldErrors<z.infer<T>>;
  disabled?: boolean;
}
