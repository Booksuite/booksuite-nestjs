import {
    PaginatedResponse,
    PaginationParams,
    PaginationQuery,
} from '@/common/types/pagination'

export function getPaginatedParams({
    page,
    itemsPerPage,
}: PaginationQuery): PaginationParams {
    const skip = (page - 1) * itemsPerPage

    return {
        skip,
        take: itemsPerPage,
    }
}

export function buildPaginatedResponse<Item>(
    items: Item[],
    totalItems: number,
    { page: currentPage, itemsPerPage }: PaginationQuery,
): PaginatedResponse<Item> {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const prepostNextPage = currentPage + 1
    const nextPage = prepostNextPage <= totalPages ? prepostNextPage : null
    const prevPage = currentPage > 1 ? currentPage - 1 : null
    return {
        items,
        totalItems,
        totalPages,
        currentPage,
        prevPage,
        nextPage,
    }
}
