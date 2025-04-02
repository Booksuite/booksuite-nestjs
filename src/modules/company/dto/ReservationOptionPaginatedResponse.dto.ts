import { withPaginatedResponse } from '@/common/dto/PaginatedResponse.dto'

import { ReservationOptionResponseFullDTO } from './ReservationOptionResponseFull.dto'

export class ReservationOptionPaginatedResponseDTO extends withPaginatedResponse(
    ReservationOptionResponseFullDTO,
) {}
