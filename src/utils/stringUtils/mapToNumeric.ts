import { NON_NUMERIC_REGEX } from "@/utils";

export const mapToNumeric = (value: string): string =>
  value.replace(NON_NUMERIC_REGEX, "");
