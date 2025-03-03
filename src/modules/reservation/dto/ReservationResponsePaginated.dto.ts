import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { ReservationResponseDTO } from './ReservationResponse.dto'

export class ReservationResponsePaginatedDTO extends withPaginatedResponse(
    ReservationResponseDTO,
) {}
