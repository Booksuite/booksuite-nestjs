import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { ServiceResponseDTO } from './ServiceResponse.dto'

export class ServicePaginatedResponseDTO extends withPaginatedResponse(
    ServiceResponseDTO,
) {}
