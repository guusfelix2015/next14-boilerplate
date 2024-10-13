import { isDDD, PHONE_PATTERN } from "@/utils";

export const isPhone = (value: string): boolean => {
    if (!PHONE_PATTERN.test(value)) return false;
    const [, , DDD] = PHONE_PATTERN.exec(value)!;
    return DDD ? isDDD(DDD) : true;
};
