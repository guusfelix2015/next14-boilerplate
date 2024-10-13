/* eslint-disable no-useless-escape */
const CEP_PATTERN = /^(\d{8}|\d{2}\.?\d{3}\-\d{3})$/;

export const isCEP = (value: string): boolean => CEP_PATTERN.test(value);
