import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { FacilityResponseDTO } from './FacilityResponse.dto'

export class FacilityResponsePaginatedDTO extends withPaginatedResponse(
    FacilityResponseDTO,
) {}
