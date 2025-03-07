import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { MediaResponseDTO } from './MediaResponse.dto'

export class MediaResponsePaginatedDTO extends withPaginatedResponse(
    MediaResponseDTO,
) {}
