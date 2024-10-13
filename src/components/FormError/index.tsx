import { cn } from "@/utils";
import { get } from "lodash";
import { type FieldErrors, type FieldValues } from "react-hook-form";

type Props = JSX.IntrinsicElements["div"] & {
    fieldName: string;
    errors: FieldErrors<FieldValues>;
};

export const FormError = ({ fieldName, errors, ...props }: Props) => {
    if (!get(errors, fieldName)) return null;

    return (
        <div
            data-testid={`error-${fieldName}`}
            {...props}
            className={cn(
                "mt-1 flex items-center text-sm text-destructive",
                props.className
            )}
        >
            <span>{String(get(errors, `${fieldName}.message`))}</span>
        </div>
    );
};
