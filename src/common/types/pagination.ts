export interface PaginatedResponse<Item> {
    items: Item[]
    totalItems: number
    totalPages: number
    currentPage: number
    prevPage: number | null
    nextPage: number | null
}

export interface PaginationQuery {
    page: number
    itemsPerPage: number
}

export interface PaginationParams {
    skip?: number
    take?: number
}
