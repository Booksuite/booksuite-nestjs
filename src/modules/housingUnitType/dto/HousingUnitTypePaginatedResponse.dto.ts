import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { HousingUnitTypeResponseFullDTO } from './HousingUnitTypeResponseFull.dto'

export class HousingUnitTypePaginatedResponseDTO extends withPaginatedResponse(
    HousingUnitTypeResponseFullDTO,
) {}
