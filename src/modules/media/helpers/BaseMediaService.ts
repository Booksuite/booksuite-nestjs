import { HasProps } from '@/common/types/helpers'
import { DataHandlerHelper } from '@/common/utils/DataHandlerHelper'
import { MediaDTO } from '../dto/Media.dto'
import {
    ExtraFieldExtra,
    MediaCreateNormalized,
    MediaUpdateNormalized,
} from '../types'

export abstract class BaseMediaService extends DataHandlerHelper {
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

    protected normalizeToUpdate<
        T extends MediaDTO,
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
