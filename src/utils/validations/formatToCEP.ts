import { mapToNumeric } from "@/utils";

export const formatToCEP = (value: string): string =>
    mapToNumeric(value).replace(/(\d{5})(\d{1,3})/, "$1-$2");
