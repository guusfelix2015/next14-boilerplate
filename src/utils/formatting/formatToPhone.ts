import { mapToNumeric } from "@/utils";

export const formatToPhone = (value: string): string =>
    mapToNumeric(value)
        .replace(/(\d{1,2})/, "($1")
        .replace(/(\(\d{2})(\d{1,4})/, "$1) $2")
        .replace(/( \d{4})(\d{1,4})/, "$1-$2")
        .replace(/( \d{1})(\d{3})(?:-)(\d{1})(\d{4})/, "$1 $2$3-$4");
