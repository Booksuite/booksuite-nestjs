import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { BannerResponseDTO } from './BannerResponse.dto'

export class BannerResponsePaginatedDTO extends withPaginatedResponse(
    BannerResponseDTO,
) {}
