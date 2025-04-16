import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { TariffOptionResponseFullDTO } from './TariffOptionResponseFull.dto'

export class TariffOptionPaginatedResponseDTO extends withPaginatedResponse(
    TariffOptionResponseFullDTO,
) {}
