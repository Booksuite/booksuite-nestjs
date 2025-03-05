import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { CompanyResponseDTO } from './CompanyResponse.dto'

export class CompanyResponsePaginatedDTO extends withPaginatedResponse(
    CompanyResponseDTO,
) {}
