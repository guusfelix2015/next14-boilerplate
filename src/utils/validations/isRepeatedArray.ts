export const isRepeatedArray = <T>(items: Array<T>): boolean =>
  items.every(item => items[0] === item);
