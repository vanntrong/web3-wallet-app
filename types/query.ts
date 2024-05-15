export interface BasePaginationQuery {
  offset?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  keyword?: string;
}
