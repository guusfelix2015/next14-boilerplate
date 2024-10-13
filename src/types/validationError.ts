export type ValidationError<T = any> = {
    field: keyof T;
    errors: string[];
};
