import { CheckSums } from "@/src/types";

export const generateCheckSums = (
    numbers: Array<number>,
    validators: Array<number>
): CheckSums => {
    const initialCheckSums: CheckSums = [0, 0];

    return validators.reduce(
        ([checkerA, checkerB], validator, index) =>
            [
                index === 0 ? 0 : checkerA + numbers[index - 1] * validator,
                checkerB + numbers[index] * validator,
            ] as CheckSums,
        initialCheckSums
    );
};
