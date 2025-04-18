import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { RateOptionResponseFullDTO } from './RateOptionResponseFull.dto'

export class RateOptionPaginatedResponseDTO extends withPaginatedResponse(
    RateOptionResponseFullDTO,
) {}
