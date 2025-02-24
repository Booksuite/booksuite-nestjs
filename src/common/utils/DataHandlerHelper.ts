import { NonOptionalId } from '@/common/types/helpers'

type BatchUpdateSet<T> = {
    toCreate: T[]
    toUpdate: NonOptionalId<T>[]
    idsToNotDelete: string[]
}

export abstract class DataHandlerHelper {
    protected extractToCreate<T extends { id?: string }>(data: T[]): T[] {
        return data.filter((media) => !media.id)
    }

    protected extractToUpdate<T extends { id?: string }>(
        data: T[],
    ): NonOptionalId<T>[] {
        return data.filter((media) => media.id as string) as NonOptionalId<T>[]
    }

    protected extractIdsToNotDelete<T extends { id?: string }>(
        data: T[],
    ): string[] {
        return this.extractToUpdate(data).map((media) => media.id)
    }

    protected extracBatchUpdateSet<T extends { id?: string }>(
        data: T[],
    ): BatchUpdateSet<T> {
        const toCreate = this.extractToCreate(data)
        const toUpdate = this.extractToUpdate(data)

        const idsToNotDelete = this.extractIdsToNotDelete(toUpdate)

        return {
            toCreate,
            toUpdate,
            idsToNotDelete,
        }
    }
}
