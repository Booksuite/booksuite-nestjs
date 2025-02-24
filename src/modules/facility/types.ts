import { type Prisma } from '@prisma/client'

import { FacilityDTO } from './dto/Facility.dto'

export type ExtraFieldExtra<
    T extends FacilityDTO,
    R extends Record<string, any>,
> = (facility: T) => R

export type FacilityCreateNormalized<ExtraFields extends Record<string, any>> =
    {
        facility: {
            create: Prisma.FacilityCreateInput
        }
    } & {
        [k in keyof ExtraFields]: ExtraFields[k]
    }

export type FacilityUpdateNormalized<ExtraFields extends Record<string, any>> =
    {
        data: {
            facility: { update: Prisma.FacilityUpdateInput }
        } & {
            [k in keyof ExtraFields]: ExtraFields[k]
        }
        where: { id: string }
    }
