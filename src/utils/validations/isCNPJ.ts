import {
  CNPJ_PATTERN,
  generateCheckSums,
  getRemaining,
  isRepeatedArray,
  mapToNumbers,
} from "@/utils";

export const isCNPJ = (value: string): boolean => {
  if (!CNPJ_PATTERN.test(value)) return false;
  const numbers = mapToNumbers(value);
  if (isRepeatedArray(numbers)) return false;
  const validators = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const checkers = generateCheckSums(numbers, validators);
  return (
    numbers[12] === getRemaining(checkers[0]) &&
    numbers[13] === getRemaining(checkers[1])
  );
};
