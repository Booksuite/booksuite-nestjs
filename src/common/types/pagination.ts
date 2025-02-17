export interface PaginatedResponse<Item> {
    items: Item[]
    totalItems: number
    currentPage: number
    prevPage: number
    nextPage: number
}
