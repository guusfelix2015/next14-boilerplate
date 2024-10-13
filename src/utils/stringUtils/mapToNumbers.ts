import { mapToNumeric } from "@/utils";

export const mapToNumbers = (value: string): Array<number> =>
    mapToNumeric(value).split("").map(Number);
