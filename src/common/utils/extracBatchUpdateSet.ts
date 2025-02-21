import { NonOptionalId } from '@/common/types/helpers'

type BatchUpdateSet<T> = {
    toCreate: T[]
    toUpdate: NonOptionalId<T>[]
    idsToNotDelete: string[]
}

export function extracBatchUpdateSet<T extends { id?: string }>(
    data: T[],
): BatchUpdateSet<T> {
    const toCreate = data.filter((media) => !media.id)
    const toUpdate = data.filter((media) => media.id) as (T & { id: string })[]

    const idsToNotDelete = toUpdate.map((media) => media.id)

    return {
        toCreate,
        toUpdate,
        idsToNotDelete,
    }
}
