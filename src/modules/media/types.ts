import { type Prisma } from '@prisma/client'

import { MediaDTO } from './dto/Media.dto'

export type ExtraFieldExtra<
    T extends MediaDTO,
    R extends Record<string, any>,
> = (media: T) => R

export type MediaCreateNormalized<ExtraFields extends Record<string, any>> = {
    media: {
        create: Prisma.MediaCreateInput
    }
} & {
    [k in keyof ExtraFields]: ExtraFields[k]
}

export type MediaUpdateNormalized<ExtraFields extends Record<string, any>> = {
    data: {
        media: { update: Prisma.MediaUpdateInput }
    } & {
        [k in keyof ExtraFields]: ExtraFields[k]
    }
    where: { id: string }
}
