import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { ServiceResponseFullDTO } from './ServiceResponseFull.dto'

export class ServicePaginatedResponseDTO extends withPaginatedResponse(
    ServiceResponseFullDTO,
) {}
