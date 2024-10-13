import { Control, FieldErrors } from "react-hook-form";
import { z, ZodSchema } from "zod";

export type ComboboxProps<T extends ZodSchema> = {
    control: Control<z.infer<T>>;
    name: string;
    items: Array<{ id: number | string; name: string }>;
    selectedItem?: { id: number | string; name: string };
    placeholder: string;
    errors: FieldErrors<z.infer<T>>;
    onChange: (item: { id: string | string; name: string }) => void;
    className?: string;
};
