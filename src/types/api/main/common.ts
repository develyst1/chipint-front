export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  code?: string;
}

export interface PageObject<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export type SortDirection = "ASC" | "DESC";

export interface PageParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  direction?: SortDirection;
}
