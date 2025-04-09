import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { OfferResponseDTO } from './offer-response.dto'

export class OfferResponsePaginatedDTO extends withPaginatedResponse(
    OfferResponseDTO,
) {}
