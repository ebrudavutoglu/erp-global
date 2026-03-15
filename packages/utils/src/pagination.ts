export interface PaginationInfo {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
}

export interface PaginatedMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function getPaginationInfo(page = 1, pageSize = 20): PaginationInfo {
  const validPage = Math.max(1, page);
  const validPageSize = Math.min(Math.max(1, pageSize), 100); // max 100 items per page

  return {
    page: validPage,
    pageSize: validPageSize,
    skip: (validPage - 1) * validPageSize,
    take: validPageSize,
  };
}

export function getPaginatedMeta(total: number, page: number, pageSize: number): PaginatedMeta {
  const totalPages = Math.ceil(total / pageSize);

  return {
    total,
    page,
    pageSize,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
