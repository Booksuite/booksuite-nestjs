import { HasProps } from '@/common/types/helpers'
import { DataHandlerHelper } from '@/common/utils/DataHandlerHelper'
import { FacilityDTO } from '../dto/Facility.dto'
import {
    ExtraFieldExtra,
    FacilityCreateNormalized,
    FacilityUpdateNormalized,
} from '../types'

export abstract class BaseFacilityService extends DataHandlerHelper {
    protected normalizeCreate<
        T extends FacilityDTO,
        R extends FacilityCreateNormalized<Omit<T, keyof FacilityDTO>>,
        E extends HasProps<Omit<T, keyof FacilityDTO>> extends never
            ? undefined
            : ExtraFieldExtra<T, Omit<T, keyof FacilityDTO>>,
    >(...args: E extends undefined ? [T[]] : [T[], E]): R[] {
        const [facilities, extraFieldsFn] = args as [T[], E]

        const toCreate = this.extractToCreate(facilities)

        return toCreate.map(
            (facility) =>
                ({
                    facility: {
                        create: {
                            name: facility.name,
                            icon: facility.icon,
                        },
                    },
                    ...extraFieldsFn?.(facility),
                }) as R,
        )
    }

    protected normalizeToUpdate<
        T extends FacilityDTO,
        R extends FacilityUpdateNormalized<Omit<T, keyof FacilityDTO>>,
        E extends HasProps<Omit<T, keyof FacilityDTO>> extends never
            ? undefined
            : ExtraFieldExtra<T, Omit<T, keyof FacilityDTO>>,
    >(...args: E extends undefined ? [T[]] : [T[], E]): R[] {
        const [facilities, extraFieldsFn] = args as [T[], E]

        const toUpdate = this.extractToUpdate(facilities)

        return toUpdate.map(
            (facility) =>
                ({
                    data: {
                        facility: {
                            update: {
                                name: facility.name,
                                icon: facility.icon,
                            },
                        },
                        ...extraFieldsFn?.(facility),
                    },
                    where: { id: facility.id },
                }) as R,
        )
    }
}
