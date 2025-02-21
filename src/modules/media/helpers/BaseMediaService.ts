import { Injectable } from '@nestjs/common'

import { NonOptionalId } from '@/common/types/helpers'
import { MediaDTO } from '../dto/Media.dto'
import {
    ExtraFieldExtra,
    MediaCreateNormalized,
    MediaUpdateNormalized,
} from '../types'

type HasProps<T extends object> = keyof T extends never ? never : T

@Injectable()
export abstract class BaseMediaService {
    protected normalizeCreate<
        T extends MediaDTO,
        R extends MediaCreateNormalized<Omit<T, keyof MediaDTO>>,
        E extends HasProps<Omit<T, keyof MediaDTO>> extends never
            ? undefined
            : ExtraFieldExtra<T, Omit<T, keyof MediaDTO>>,
    >(...args: E extends undefined ? [T[]] : [T[], E]): R[] {
        const [medias, extraFieldsFn] = args as [T[], E]
        return medias.map(
            (media) =>
                ({
                    media: {
                        create: {
                            metadata: media.metadata,
                            url: media.url,
                        },
                    },
                    ...extraFieldsFn?.(media),
                }) as R,
        )
    }

    normalizeToUpdate<
        T extends NonOptionalId<MediaDTO>,
        R extends MediaUpdateNormalized<Omit<T, keyof MediaDTO>>,
        E extends HasProps<Omit<T, keyof MediaDTO>> extends never
            ? undefined
            : ExtraFieldExtra<T, Omit<T, keyof MediaDTO>>,
    >(...args: E extends undefined ? [T[]] : [T[], E]): R[] {
        const [medias, extraFieldsFn] = args as [T[], E]

        return medias.map(
            (media) =>
                ({
                    data: {
                        media: {
                            update: {
                                url: media.url,
                                metadata: media.metadata,
                            },
                        },
                        ...extraFieldsFn?.(media),
                    },
                    where: { id: media.id },
                }) as R,
        )
    }
}
