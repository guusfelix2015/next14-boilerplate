export const getRemaining = (value: number): number =>
    value % 11 < 2 ? 0 : 11 - (value % 11);
