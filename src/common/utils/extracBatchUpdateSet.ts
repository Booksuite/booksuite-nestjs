type BatchUpdateSet<T> = {
    toCreate: T[]
    toUpdate: T[]
    idsToNotDelete: string[]
}

export function extracBatchUpdateSet<T extends { id?: string }>(
    data: T[],
): BatchUpdateSet<T> {
    const toCreate = data.filter((media) => !media.id)
    const toUpdate = data.filter((media) => media.id)

    const idsToNotDelete = toUpdate.map((media) => media.id as string)

    return {
        toCreate,
        toUpdate,
        idsToNotDelete,
    }
}
