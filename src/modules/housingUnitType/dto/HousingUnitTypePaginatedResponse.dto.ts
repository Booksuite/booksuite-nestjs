import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { HousingUnitTypeResponseDTO } from './HousingUnitTypeResponse.dto'

export class HousingUnitTypePaginatedResponseDTO extends withPaginatedResponse(
    HousingUnitTypeResponseDTO,
) {}
