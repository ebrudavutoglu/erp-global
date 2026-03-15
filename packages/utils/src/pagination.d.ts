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
export declare function getPaginationInfo(page?: number, pageSize?: number): PaginationInfo;
export declare function getPaginatedMeta(total: number, page: number, pageSize: number): PaginatedMeta;
