import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'
import { UtilityLinksResponseDTO } from '@/modules/utilityLinks/dtos/UtilityLinksResponse.dto'

export class UtilityLinksPaginatedResponseDTO extends withPaginatedResponse(
    UtilityLinksResponseDTO,
) {}
