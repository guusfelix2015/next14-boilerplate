import { mapToNumeric } from "@/utils";

export const formatToCNPJ = (value: string): string =>
    mapToNumeric(value)
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
