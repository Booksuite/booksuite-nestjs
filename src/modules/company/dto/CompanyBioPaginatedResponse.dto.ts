import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'
import { CompanyBioResponseDTO } from '@/modules/company/dto/CompanyBioResponse.dto'

export class CompanyBioPaginatedResponseDTO extends withPaginatedResponse(
    CompanyBioResponseDTO,
) {}
