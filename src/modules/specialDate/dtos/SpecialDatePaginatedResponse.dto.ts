import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { SpecialDateResponseFullDTO } from './SpecialDateResponseFull.dto'

export class SpecialDatePaginatedResponseDTO extends withPaginatedResponse(
    SpecialDateResponseFullDTO,
) {}
