export interface Paginated<T> {
  data: T[];
  pagination: { page: number; perPage: number; total: number };
}
