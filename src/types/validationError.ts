/* eslint-disable @typescript-eslint/no-explicit-any */
export type ValidationError<T = any> = {
  field: keyof T;
  errors: string[];
};
